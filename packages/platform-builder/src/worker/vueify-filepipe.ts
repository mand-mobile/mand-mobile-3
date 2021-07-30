import * as path from 'path'
import fs from 'fs-extra'
import _ from 'lodash/fp'
import {transform} from '@babel/core'
import {compiler} from 'zp-vueify'
import stylus from 'stylus' 
import postcss from 'postcss'
import {parentPort, workerData} from 'worker_threads'

import {createTranspiler, filePipe, compileStyle} from '../utils/transpile'
import {resolvePackagePath} from '../utils/file'

const {
  pkgContext,
  files,
  componentRoot,
  distRoot,
  babelConfig,
  babelConfigVue,
  stylusConfig,
  postcssConfig
} = JSON.parse(workerData)

process.on('unhandledRejection', err => {
  throw err
})

postcssConfig.plugins = postcssConfig.plugins ? postcssConfig.plugins.map(plugin => {
  if (Array.isArray(plugin)) {
    const [id, params] = plugin
    return require(id)(params)
  } else {
    return plugin ? require(plugin) : ''
  }
}).filter(plugin => plugin) : []


const globalStyle = resolvePackagePath('~@mand-mobile/shared/lib/style/global.styl', pkgContext)
const globalStyleOutout = path.join(distRoot, '/style/global.css')

compileStyle(globalStyle, globalStyleOutout, stylusConfig, postcssConfig)
  .then(() => {
    processFile()
  })

let completed = 0
function processFile () {
  if (!files.length) {
    return
  }

  const file = files.pop()
  const filePath = file.path
  const fileOutput = path.join(distRoot, path.relative(componentRoot, file.name))

  const _babelConfigVue = JSON.parse(
    JSON.stringify(babelConfigVue)
      .replace('_GLOBAL_STYLE_', globalStyleOutout)
      .replace('_FILE_PATH_', fileOutput)
  )

  const _emitFiles = {}
  const transpile = createTranspiler(filePath, {
    'vue': (code, context) => {
      const config = {
        extractCSS: true,
        babel: _babelConfigVue,
        // postcss: postcssConfig.plugins,
        customCompilers: {
          stylus: (content, cb, _compiler, _filePath) => {
            stylus.render(content, stylusConfig, (err, css) => {
              if (err) throw err
              cb(null, css)
            })
          },
        }
      }
      compiler.applyConfig(config)

      let styleContent = ''
      const styleCb = res => {
        return styleContent += (res.style || '')
      } 
      compiler.on('style', styleCb)

      return new Promise<string>((resolve, reject) => {
        compiler.compile(code, filePath, (err, result) => {
          if (err) {
            return reject(err)
          }
          // resolve(result)
          compiler.removeListener('style', styleCb)
          postcss(postcssConfig.plugins)
            .process(styleContent, {from: undefined})
            .then(compileResult => {
              // 使用去平台化后的文件名
              context.emitFile(`${path.basename(file.name, '.vue')}.css`, Buffer.from(compileResult.css, 'utf8'))
              resolve(result)
            })
        })
      })
    },
    'js': code => {
      // console.log(JSON.stringify(babelConfig))
      //@ts-ignore
      return transform(code, babelConfig).code
    }
  }, {
    emitFile: (file, buffer) => {
      _emitFiles[file] = buffer
    }
  })

  return filePipe({
    from: filePath,
    to: fileOutput.replace(/\.vue$/, '.js'),
    onWrite: (buf: Buffer, {to}) => {
      Object.keys(_emitFiles).forEach((file: any) => {
        let target = file
        if (!path.isAbsolute(target)) {
          target = path.resolve(path.dirname(to), file)
        }
        fs.outputFileSync(target, _emitFiles[file])
        delete _emitFiles[file]
      })
    }
  })(transpile).finally(() => {
    parentPort.postMessage({
      completed: ++completed,
      file: filePath
    })
    processFile()
  })
}