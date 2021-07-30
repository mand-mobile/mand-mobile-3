const Service = require('@vue/cli-service')

module.exports = function (api, {pkgContext, projectOptions}) {
  api.registerCommand('service', (args, rawArgv) => {
    const {target} = args
    api.builder.run(`service-${target}`, args, rawArgv)
  })
}