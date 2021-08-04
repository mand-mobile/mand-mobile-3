const path = require('path')
const alias = require('@rollup/plugin-alias')
const vueCompiler = require('rollup-plugin-vue')
const stylus = require('stylus')
const {nodeResolve} = require('@rollup/plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')
const filesize = require('rollup-plugin-filesize')
const replace = require('rollup-plugin-replace')
const {getBabelOutputPlugin} = require('@rollup/plugin-babel')
// const stylus = require('rollup-plugin-stylus-compiler')

const pkg = path.resolve(process.cwd(), './package.json')
const {defineOptions} = require('../../../lib')
const {resolvePackagePath} = require('../../../lib/utils')
const stylusCompiler = require('../../../lib/rollup-plugins/rollup-plugin-stylus')

const resolver = nodeResolve({
  extensions: ['.web.vue', '.web.js', '.web.ts', '.vue', '.js', '.ts', '.json'],
})

const resolve = dir => {
  return resolvePackagePath(dir, process.env.MAND_CONTEXT)
}

const stylusMixin = styl =>
  styl
    .import(resolve('~@mand-mobile/shared/lib/style/mixin/util.styl'))
    .import(resolve('~@mand-mobile/shared/lib/style/mixin/theme.components.styl'))
    .import(resolve('~@mand-mobile/shared/lib/style/mixin/theme.basic.styl'))

module.exports = defineOptions({
  rollupOptions: {
    external: ['Vue'],
    plugins: [
      alias({
        entries: {
          '@mand-mobile/platform-runtime/lib': '@mand-mobile/platform-runtime/lib/web',
        },
        customResolver: resolver,
      }),
      resolver,
      stylusCompiler({
        fn: stylusMixin,
      }),
      vueCompiler({
        css: false,
        style: {
          preprocessOptions: {
            stylus: {
              use: [
                stylusMixin,
                styl => {
                  styl.define('url', stylus.url())
                },
              ],
            },
          },
        },
      }),
      postcss({
        plugins: [
          require('postcss-url')({url: 'inline'}),
          require('cssnano')({
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
          }),
        ],
        extract: 'mand-mobile.css',
      }),
      replace({
        MAN_VERSION: `'${require(pkg).version}'`,
      }),
      filesize(),
    ],
    output: {
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env'],
          plugins: [
            [
              path.resolve(__dirname, '../../../lib/babel-plugins/babel-transform-platform'),
              {platform: process.env.MAND_PLATFORM},
            ],
            path.resolve(__dirname, '../../../lib/babel-plugins/babel-transform-memberExpression'),
          ],
          // 生产环境，移除不必要的注释
          comments: false,
          // 保留rollup构建后原本的格式
          allowAllFormats: true,
        }),
      ],
      name: 'mand-mobile',
      exports: 'named',
    },
  },
})
