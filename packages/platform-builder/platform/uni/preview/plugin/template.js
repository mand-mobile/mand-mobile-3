module.exports = function (api, {target, context}) {
  const source = api.builder.resolveTemplates()
  const componentTemplate = `${source}/common/demo-group.vue`
  const homeTemplate = `${source}/pages/home.vue`
  const categoryTemplate = `${source}/pages/category.vue`
  const components = context.components || []
  const componentsSortByCategory = context.componentsSortByCategory || []
  
  function findComponent(name) {
    return components.find(component => component.name === name)
  }

  if (target) { // 使用渲染动态模板渲染
    api.registerTemplate(componentTemplate, 'pages/index.vue', {
      component: findComponent(target)
    })
  } else { // 基于类目拆包 [{category: 'basic', list: [...]}]
    componentsSortByCategory.forEach(item => {
      item.list.forEach(component => {
        api.registerTemplate(componentTemplate, `${item.category}/pages/${component.name}.vue`, { component })
      })
    })
  }

  // 忽略动态模板自身渲染
  api.builder.templates.forEach(item => {
    if (item.template === source) {
      item.ignores = item.ignores || []
      item.ignores.push(componentTemplate)
      if (target) {
        item.ignores.push(homeTemplate)
        item.ignores.push(categoryTemplate)
      }
    }
  })
}