import * as path from 'path'
import _ from 'lodash/fp'
import {transform} from '@babel/core'
import {parse} from '@vue/compiler-dom'
import type {RootNode} from '@vue/compiler-dom'
import prettier from 'prettier'
import stylus from 'stylus' 
import {parentPort, workerData} from 'worker_threads'

import {createTranspiler, filePipe} from '../utils/transpile'

const {
  files,
  componentRoot,
  distRoot,
  babelConfig,
  stylusConfig
} = JSON.parse(workerData)

process.on('unhandledRejection', err => {
  throw err
})

processFile()

const formater = _.curry((parser, code) => {
  const rule = {
    semi: false,
    singleQuote: true,
    // trailingComma: 'es5',
    // arrowParens: 'always',
    printWidth: 60,
    tabWidth: 2,
  }
  return prettier.format(code, {...rule, parser})
})

let completed = 0

function processFile () {
  if (!files.length) {
    return
  }

  const file = files.pop()

  const transpile = createTranspiler(file.path, {
    'vue': code => {
      const ast = parse(code)
      return formater('vue')([
        templateCompiler(ast),
        scriptCompiler(ast, babelConfig),
        styleCompiler(ast, stylusConfig)
      ].join('\n\n'))
    },
    'js': code => {
      //@ts-ignore
      return formater('babel')(transform(code, babelConfig).code)
    }
  })

  filePipe({
    from: file.path,
    to: path.join(distRoot, path.relative(componentRoot, file.name))
  })(transpile).finally(() => {
    parentPort.postMessage({
      completed: ++completed,
      file: file.path
    })
    processFile()
  })
}

function scriptCompiler (ast: RootNode, babelConfig = {}) {
  let code = ''
  ast.children
    .filter((child: any) => {
      return child.tag === 'script'
    })
    .forEach((node: any) => {
      node.children.forEach(js => {
        code += `<script>${
          //@ts-ignore
          transform(js.loc.source, babelConfig).code
        }</script>`
      })
    })
  return code
}

function styleCompiler (ast: RootNode, stylusConfig: any = {}) {
  let code = ''
  ast.children
    .filter((child: any) => {
      return child.tag === 'style'
    })
    .forEach((t: any) => {
      if (!stylusConfig.transformCss) {
        code += t.loc.source
      } else {
        t.children.forEach(styl => {
          stylus.render(styl.loc.source, stylusConfig, (err, css) => {
            if (err) throw err
            code += `<style>${css}</style>`
          })
        })
      }
    })
  return code
}

function templateCompiler (ast: RootNode) {
  let code = ''
  ast.children
    .filter((child: any) => {
      return child.tag === 'template'
    })
    .forEach(c => {
      code += genTemplate(c).code
    })

  return code
}

const NORMAL_ATTR = 6
function injectProps(props, context) {
  const {push} = context
  props.forEach(prop => {
    push(` `)
    const {type, name, value, loc} = prop
    if (type === NORMAL_ATTR) {
      value ? push(`${name}=${value.loc.source}`) : push(`${name}`)
    } else {
      push(loc.source)
    }
  })
}

function injectImgMode() {
  return [
    {
      name: 'mode',
      value: {
        loc: {
          source: '"widthFix"',
        },
      },
      type: NORMAL_ATTR,
    },
  ]
}

function genHTML(ast, context) {
  const {push, newline} = context
  ast.children.forEach(child => {
    const {tag, isSelfClosing, props} = child
    if (tag) {
      if (isSelfClosing) {
        push(`<${tag}`)
        injectProps(props, context)
        if (tag === 'img') {
          injectProps(injectImgMode(), context)
        }
        push(`/>`)
        newline()
      } else {
        push(`<${tag}`)
        injectProps(props, context)
        push(`>`)
        if (child.children && child.children.length) {
          genHTML(child, context)
        }
        push(`</${tag}>`)
        newline()
      }
    } else {
      push(child.loc.source)
    }
  })
}

function genTemplate (ast) {
  const context = {
    code: ``,
    push(code) {
      context.code += code
    },
    source: ast.loc.source,
    newline(n = 2) {
      context.push('\n' + ` `.repeat(n))
    },
  }

  context.push('<template>')
  context.newline()
  genHTML(ast, context)
  context.push('</template>')
  context.newline()

  return context
}