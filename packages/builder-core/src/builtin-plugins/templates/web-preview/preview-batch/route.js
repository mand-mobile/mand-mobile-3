import components from './components.json'
import * as demo from './demo-index'

const traverseComponents = (data, fn) => {
  data.map(item =>
    item.list && item.list.map(subItem =>
      fn(subItem)
    )
  )
}
const registerRoute = (components) => {
  const routes = []
  traverseComponents(components, (component) => {
    routes.push({
      name: component.name,
      path: component.path,
      component: demo[component.camelCaseStyledName] || {},
      meta: {
        title: component.camelCaseStyledName || '',
        description: component.text || ''
      }
    })
  })
  return routes
}

const routes = registerRoute(components)

routes.push({
  path: '/home',
  component: demo['Home']
})
routes.push({
  path: '/category',
  component: demo['Category']
})
routes.push({
  path: '/',
  redirect: '/home'
})

export default routes
