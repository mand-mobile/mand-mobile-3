const path = require('path')
const VueUtils = require('@vue/cli-shared-utils')
const Service = require('@vue/cli-service')

const logWithSpinner = VueUtils.logWithSpinner

function idToPlugin(ids, context) {
  return ids.map(id => {
    return {id, apply: require(id)}
  })
}
module.exports = function(api, {pkgContext, projectOptions}) {
  const {tempDir, outputDir} = projectOptions

  api.registerLinks(path.resolve(__dirname, '../../../../node_modules'), 'node_modules')

  api.registerCommand('service', (args, rawArgv) => {
    // process.env.UNI_CLI_CONTEXT = pkgContext
    process.env.UNI_INPUT_DIR = path.resolve(pkgContext, `${tempDir}/uni`)
    process.env.UNI_OUTPUT_DIR = path.resolve(pkgContext, args.output || outputDir)
    process.env.UNI_PLATFORM = args.subplatform || 'mp-weixin'

    const service = new Service(process.env.UNI_INPUT_DIR, {
      plugins: idToPlugin([
        '@dcloudio/vue-cli-plugin-hbuilderx',
        '@dcloudio/vue-cli-plugin-uni',
        '@dcloudio/vue-cli-plugin-uni-optimize',
        '@vue/cli-plugin-babel',
      ]),
      inlineOptions: projectOptions.vueOptions,
    })
    service.init()

    VueUtils.logWithSpinner = () => {}

    service
      .run('build', args, rawArgv)
      .then(() => {
        VueUtils.logWithSpinner = logWithSpinner
      })
      .catch(err => {
        console.error('\n' + err.message || err.stack || err)
        process.exit(1)
      })
  })
}
