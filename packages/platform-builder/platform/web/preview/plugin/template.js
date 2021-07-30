module.exports = function (api, {target, context}) {
  const source = api.builder.resolveTemplates()
  const template = `${source}/common/demo-group.vue`
  const components = context.components || []
  
  function findComponent(name) {
    return components.find(component => component.name === name)
  }

  // 使用渲染动态模板渲染
  if (target) {
    api.registerTemplate(template, 'pages/demo-group.vue', {
      component: findComponent(target)
    })
  } else {
    components.forEach(component => {
      const name = component.name
      api.registerTemplate(template, `pages/${name}.vue`, {
        component: findComponent(name)
      })
    })
  }

  // 忽略动态模板自身渲染
  api.builder.templates.forEach(item => {
    if (item.template === source) {
      item.ignores = item.ignores || []
      item.ignores.push(template)
    }
  })
}