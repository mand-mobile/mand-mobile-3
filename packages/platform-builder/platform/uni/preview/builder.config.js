const path = require('path')
// const poststylus = require('poststylus')
// const px2rem = require('postcss-plugin-px2rem')
// const px2vw = require('postcss-pixel-to-viewport')

function resolve (dir) {
  return path.join(process.env.MAND_CONTEXT, dir)
}

module.exports = {
  componentPath: '~@mand-mobile/components/src',
  mainEntry: '', // uniapp 插件有自动寻找入口规则，不需要编译时主动设置入口
  vueOptions: {
    devServer: {
      progress: false,
    },
    productionSourceMap: false,
    css: {
      loaderOptions: {
        stylus: {
          import: [
            '~@mand-mobile/shared/lib/style/mixin/util.styl',
            '~@mand-mobile/shared/lib/style/mixin/theme.components.styl',
            '~@mand-mobile/shared/lib/style/mixin/theme.basic.styl'
          ]
        }
      }
    },
    configureWebpack: {
      resolve: {
        alias: {
          'mand-mobile/lib': '@mand-mobile/components/src',
          'mand-mobile': '@mand-mobile/components/src'
        },
        symlinks: false
      },
      stats: 'errors-only'
    }
  }
}