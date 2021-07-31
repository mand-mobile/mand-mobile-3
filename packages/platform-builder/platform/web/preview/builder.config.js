const path = require('path')
const poststylus = require('poststylus')
// const px2vw = require('postcss-pixel-to-viewport')

const px2rem = require('postcss-plugin-px2rem')({
  rootValue: 100,
  minPixelValue: 2,
  propWhiteList: [],
})
const cssnano = require('cssnano')({
  preset: [
    'default',
    {
      zindex: false,
      mergeIdents: false,
      discardUnused: false,
      autoprefixer: false,
      reduceIdents: false,
    },
  ],
})
const autoprefixer = require('autoprefixer')({})

// const px2vwConfig = {
//   rootValue: 100,
//   minPixelValue: 2,
//   propWhiteList: []
// }

const {defineOptions} = require('../../../lib')

function resolve(dir) {
  return path.join(process.env.MAND_CONTEXT, dir)
}

module.exports = defineOptions({
  componentPath: '~@mand-mobile/components/src',
  vueOptions: {
    devServer: {
      progress: false,
    },
    css: {
      loaderOptions: {
        postcss: {
          plugins: [px2rem, cssnano, autoprefixer],
        },
        stylus: {
          use: [
            poststylus([
              // process.env.MAND_UNIT === 'vw'
              // ? px2vw(px2vwConfig)
              // : px2rem(px2remConfig),
              px2rem,
            ]),
          ],
          import: [
            '~@mand-mobile/shared/lib/style/mixin/util.styl',
            '~@mand-mobile/shared/lib/style/mixin/theme.components.styl',
            '~@mand-mobile/shared/lib/style/mixin/theme.basic.styl',
          ],
        },
      },
    },
    configureWebpack: {
      resolve: {
        alias: {
          'mand-mobile/lib': '@mand-mobile/components/src',
          'mand-mobile': '@mand-mobile/components/src',
        },
      },
    },
    chainWebpack: config => {
      config.plugin('html').tap(args => {
        args[0].template = resolve('/.temp/web/public/index.html')
        return args
      })
    },
  },
})
