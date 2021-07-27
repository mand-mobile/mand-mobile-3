import * as path from 'path'
import merge from 'webpack-merge'
import defaultsDeep from 'lodash.defaultsdeep'
import createWebpackBar from './webpack-plugins/webpackbar'

const DEFAULT_OPTIONS = {
  // 生成中间临时文件目录
  tempDir: '__temp__',
  // 构建产出静态文件目录
  outputDir: 'dist',
  // component源码所在目录 支持绝对路径、相对路径和依赖包(以~开头)
  componentPath: '@mand-mobile/components/src',
  // 默认入口文件
  mainEntry: 'main.js',
  vueOptions: {}
}

export default class Options {
  public context: any
  public options: any
  public webpackChainFns: any[]
  public webpackRawConfigFns: any[]
  constructor(userOptions: any, builder?: any) {
    this.context = builder
    this.options = defaultsDeep(userOptions, DEFAULT_OPTIONS)
    this.webpackChainFns = []
    this.webpackRawConfigFns = []

    const {vueOptions} = this.options

    if (vueOptions.configureWebpack) {
      let configureWebpack = vueOptions.configureWebpack
      configureWebpack = typeof configureWebpack === 'object' ?
        {...configureWebpack} : configureWebpack
      this.webpackRawConfigFns.push(configureWebpack)
    }

    // chainWebpack先于configureWebpack执行，最后的merge在configureWebpack中
    vueOptions.configureWebpack = config => {
      // 合并执行configureWebpack，得到用户configureWebpack配置
      const userConfig = this.resolveWebpackConfig() 
      // 用户configureWebpack配置与其它配置（默认配置、chainWebpak配置等）
      const webpackConfig = this.setInlineWebpackConfig(userConfig, config)
      return webpackConfig
    }
  }

  // config 为builder.config中的用户配置
  // configRef 是 vue-cli-service 用于合并插件和用户配置中的webpack配置时的索引
  setInlineWebpackConfig(config, configRef) {
    const {pkgContext, platform} = this.context
    const {tempDir, mainEntry} = this.options

    const resolve = config.resolve || {}
    const extensions = resolve.extensions || configRef.resolve.extensions
    const alias = resolve.alias || {}
    const plugins = config.plugins || []

    resolve.extensions = this.setExtensions(extensions, platform)
    configRef.resolve.extensions = [] // 需清空当前索引中的值，否则后添加的特定平台拓展名会被压盖
    
    resolve.alias = this.setAlias(alias, platform)

    plugins.push(
      createWebpackBar(platform)
    )

    if (mainEntry) {
      config.entry = config.entry || path.resolve(pkgContext, `${tempDir}/${platform}/${mainEntry}`)
    }

    config.resolve = resolve
    config.plugins = plugins

    return config
  }

  setExtensions(extensions, platform) {
    // ['.js'] => ['.web.js', '.js'] 
    return (extensions.map(ext => `.${platform}${ext}`)).concat(extensions)
  }

  setAlias(alias, platform) {
    // @mand-mobile/platform-runtime/lib/component/transition => @mand-mobile/platform-runtime/lib/web/component/transition
    alias['@mand-mobile/platform-runtime/lib'] = `@mand-mobile/platform-runtime/lib/${platform}`
    return alias
  }

  resolveWebpackConfig() {
    let config = {}

    this.webpackRawConfigFns.forEach(fn => {
      if (typeof fn === 'function') {
        const res = fn(config)
        if (res) config = merge(config, res)
      } else if (fn) {
        config = merge(config, fn)
      }
    })
    
    return config
  }
}