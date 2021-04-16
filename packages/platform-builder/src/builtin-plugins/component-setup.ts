import {resolveComponents, resolveCategory} from '../utils'

export default function (api, options) {
  const {platform, pkgContext, projectOptions} = options
  const {componentPath} = projectOptions
  const components = resolveComponents({
    componentPath,
    platform
  }, pkgContext)
  
  const componentsSortByCategory = resolveCategory({
    componentPath,
    components
  }, pkgContext)

  api.setContext('components', components)
  api.setContext('componentsSortByCategory', componentsSortByCategory)
}