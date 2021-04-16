// 如果插件内实现了以下三个方法，则不执行BuilderContainer本身的 create, serve, build方法，改为使用插件实现的相关的方法，
// BuilderContainer 的config.plugins是一个数组，则后边的plugins.create|serve|build方法会覆盖前面的.

export default class Plugin {
  public builder: any
  public id: string
  constructor (id: string, builder) {
    this.builder = builder
    this.id = id
  }

  registerCommand(command, handler) {
    this.builder.commands[command] = handler
  }

  registerTemplate(template, renderAs, templateData?, ignores?) {
    this.builder.templates.push({
      template,
      templateData,
      renderAs,
      ignores
    })
  }

  registerLinks(source, target) {
    this.builder.linkFiles.push({source, target})
  }

  setContext(key, val) {
    this.builder.context[key] = val
  }
}