module.exports = function(api, {context}) {
  api.registerCommand('service', (args, rawArgv) => {
    const {target} = args

    if (target === 'bundle') {
      const components = context.components || []
      const source = api.builder.resolveTemplates()
      const template = `${source}/index.js`
      api.registerTemplate(template, 'index.js', {components})
    }

    api.builder.run(`service-${target}`, args, rawArgv)
  })
}
