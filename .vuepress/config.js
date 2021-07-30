const path = require('path')
const packageInfo = require('../packages/mand-mobile/package.json')
const resolve = file => path.resolve(__dirname, file)

const componentsSidebarConfig = [
  {
    name: 'components',
    title: 'COMPONENTS',
    children: [{
      name: 'basic',
      title: 'Basic',
    }, {
      name: 'feedback',
      title: 'Feedback',
    }, {
      name: 'business',
      title: 'Business',
    }, {
      name: 'form',
      title: 'Form',
    }, {
      name: 'gesture',
      title: 'Gesture',
    }]
  }
]

module.exports = {
  title: 'Mand Mobile 3',
  base: '/mand-mobile/',
  head: [
    ['link', { rel: 'icon', href: 'https://pt-starimg.didistatic.com/static/starimg/img/ySOsAunfGm1610683661213.png' }],
    ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover' }],
    ['meta', { name: 'format-detection', content: 'telephone=no,email=no' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-touch-fullscreen', content: 'yes' }],
  ],
  themeConfig: {
    version: packageInfo.version,
    logo: 'https://pt-starimg.didistatic.com/static/starimg/img/ySOsAunfGm1610683661213.png',
    repo: 'https://github.com/mand-mobile/mand-mobile-3',
    demoConfig: {
      shadowMode: false
    },
    searchPlaceholder: '搜索',
    locales: {
      '/': {
        nav: [
          { text: '首页', link: '/' },
          { text: '组件', link: '/packages/components/', redirect: '/packages/components/development' },
          { text: '模块', link: '/packages/modules/', redirect: '/packages/modules/platform-builder' },
          { text: '2.x', link: 'https://didi.github.io/mand-mobile' },
          { text: 'Github', link: 'https://github.com/mand-mobile/mand-mobile-3' },
        ],
        sidebar: {
          '/packages/components/': [
            {
              name: 'development',
              title: '开发指南'
            }, {
              name: 'changelog',
              title: '更新日志'
            }, 
            ...componentsSidebarConfig
          ],
          '/packages/modules/': [
            {
              name: 'platform-builder',
              title: 'PlatformBuilder'
            },
            {
              name: 'platform-runtime',
              title: 'PlatformRuntime'
            }, {
              name: 'scroller',
              title: 'Scroller'
            }, {
              name: 'shared',
              title: 'Shared'
            },
            // {
            //   name: 'Outbound',
            //   title: 'test',
            //   link: 'https://www.baidu.com'
            // }, 
          ],
        },
      },
      // '/en-US/': {
      //   nav: [
      //     { text: 'Home', link: '/' },
      //     { text: 'Component', link: '/en-US/packages/components/', redirect: '/en-US/packages/components/development' },
      //     { text: 'Platform', link: '/en-US/packages/platform', redirect: '/en-US/packages/platform' },
      //     { text: '2.x', link: 'https://didi.github.io/mand-mobile' },
      //     { text: 'Github', link: 'https://github.com/mand-mobile/mand-mobile-3' },
      //   ],
      //   sidebar: {
      //     '/en-US/packages/components/': [
      //       {
      //         name: 'development',
      //         title: 'Development Guide'
      //       }, {
      //         name: 'changelog',
      //         title: 'Change Log'
      //       }, 
      //       ...componentsSidebarConfig
      //     ],
      //   },
      // }
    }
    // sidebarDepth: 2
  },
  patterns: [
    // '**/*.vue',
    // '**/*.md',
    '**/packages/components/**/*.md',
    '**/packages/platform-runtime/**/*.md',
    '**/packages/platform-builder/**/*.md',
    '**/packages/scroller/**/*.md',
    '**/packages/shared/**/*.md',
    'README.md',
    'CHANGELOG.md',
    'DEVELOPMENT.md',
    '!**/packages/examples/**',
    '!**/packages/mand-mobile/**',
    '!**/node_modules/**',
    '!**/__temp__/**',
    '!**/.mand-mobile/**',
    '!**/lib/**',
    '!**/lib-vw/**',
    '!**/dist/**'
  ],
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-task-lists'), {enabled: true})
    },
    toc: { includeLevel: [2, 3, 4] }
  },
  locales: {
    '/': {
      lang: 'zh-CN',
      description: 'Vue 驱动的静态网站生成器'
    },
    '/en-US/': {
      lang: 'en-US',
      description: 'Vue-powered Static Site Generator'
    },
  },   
  plugins: [
    require('./plugins/dynamic-locals/index.js'),
    require('./plugins/dynamic-demos/index.js'),
    require('./plugins/dynamic-component-info/index.js'),
  ],
  stylus: {
    import: [
      resolve('../packages/shared/src/style/mixin/util'),
      resolve('../packages/shared/src/style/mixin/theme.components'),
      resolve('../packages/shared/src/style/mixin/theme.basic'),
      // resolve('../packages/shared/src/style/global.styl'),
      // resolve('./theme/styles/mand-mobile')
    ]
  },
  chainWebpack: (config, isServer) => {
    config.resolve.alias
      .set('mand-mobile/lib', resolve('../packages/components/src'))
      .set('@mand-mobile/platform-runtime/lib', resolve('../packages/platform-runtime/src/web'))
      .set('@mand-mobile', resolve('../packages'))

    config.resolve.extensions
      .prepend('.web.js')
      .prepend('.web.vue')
  }
}