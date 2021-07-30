const path = require('path')

module.exports = function babelPluginImportStyle({types: t}) {
  return {
    visitor: {
      Program(p, state) {
        const filePath = state.opts.filePath
        const fileExt = path.extname(filePath)
        const fileDir = path.dirname(filePath)
        const importLiteral = `./${path.basename(filePath, fileExt)}.css`
        p.unshiftContainer('body', t.ImportDeclaration([], t.StringLiteral(importLiteral)))
        p.unshiftContainer(
          'body',
          t.ImportDeclaration([], t.StringLiteral(path.relative(fileDir, state.opts.globalStyle))),
        )
      },
    },
  }
}
