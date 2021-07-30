import * as path from 'path'
import * as fs from 'fs-extra'
import _ from 'lodash/fp'
import stylus from 'stylus' 
import postcss from 'postcss'

import {strToBuffer, bufferToStr} from './helper'
import {error} from './log'

// type ParamType<T> = T extends (source: any, transpile: infer P) => any ? P : T
type StrategyHandler = (code: string, context: any) => string | Promise<string>
type Transpiler = (source: Buffer) => Promise<Buffer>

export function createTranspiler (
  filename: string,
  strategies: {vue: StrategyHandler, js: StrategyHandler, [lang: string]: StrategyHandler},
  context = {}
): Transpiler {
  const strategyTable = {
    default: buf => Promise.resolve(buf)
  }
  Object.keys(strategies).map(lang => {
    strategyTable[`.${lang}`] = async function transpiler (source) {
      const code = await strategies[lang](
        bufferToStr(source),
        context
      )
      return strToBuffer(code)
    }
  })
  return strategyTable[path.extname(filename) ] || strategyTable.default
}

export function filePipe (options: {
  from: string,
  to: string,
  onRead?: (options) => void
  onWrite?: (buf: Buffer, options) => void
}) {
  const {from, to, onRead, onWrite} = options
  const reader = function () {
    onRead && onRead(options)
    return fs.readFile(from)
  }
  const writer = function (buf: Buffer) {
    onWrite && onWrite(buf, options)
    return fs.outputFile(to, buf)
  }

  return async function build (transpile: Transpiler) {
    // _.flowRight(writer, transpile, reader)()
    try {
      return writer(await transpile(await reader()))
    } catch (err) {
      err.info = {from, to}
      throw err
    }
  }
}

export function compileStyle (filePath, outputPath, stylusConfig, postcssConfig?) {
  return new Promise(resolve => {
    const content = fs.readFileSync(filePath, 'utf-8')
    stylus.render(content, stylusConfig, async (err, css) => {
      if (err) throw err
      const output = (content: string) => {
        fs.outputFileSync(outputPath, Buffer.from(content, 'utf8'))
        resolve(content)
      }
      if (postcssConfig) {
        const result = await postcss(postcssConfig.plugins).process(css, {from: undefined})
        output(result.css)
      } else {
        output(css)
      }
    })
  })
}