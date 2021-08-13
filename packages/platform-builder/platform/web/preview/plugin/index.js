const Service = require('@vue/cli-service')

module.exports = function(api, {pkgContext, projectOptions}) {
  // console.log('pluginssssss', 'platform/web/preview/plugin')
  api.registerCommand('service', (args, rawArgv) => {
    const service = new Service(pkgContext, {
      plugins: [], // 必须设置为空，否则会自动加载依赖中的插件
      inlineOptions: {
        ...projectOptions.vueOptions,
        outputDir: args.output,
      },
    })
    if (!args.export) {
      service.run('serve', args, rawArgv).catch(err => {
        // eslint-disable-next-line no-console
        console.error(err.message)
      })
    } else {
      service.run('build', args, rawArgv).catch(err => {
        // eslint-disable-next-line no-console
        console.error(err.message)
      })
    }
  })
}
