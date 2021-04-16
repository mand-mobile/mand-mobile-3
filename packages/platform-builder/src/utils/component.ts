import * as path from 'path'
import * as fs from 'fs'
import _ from 'lodash/fp'
import anymatch from 'anymatch'

import { loadModule } from './module'
import { resolvePackagePath } from './file'
import { toUpperName } from './helper'
import { chalk, error } from './log'

interface IComponents {
  path: string,

  name: string,
  dashedStyledName: string,
  camelCaseStyledName: string,
  text: string,
  
  category: string,
  description: string,
  author: string,
}

function skipAndOnlyFileFilter (files) {
  const onlyMatcher = '*-only?(.*).vue'
  const skipMatcher = '*-skip?(.*).vue'
  const hasOnlyTag = !!_.find(file => anymatch(onlyMatcher, file), files)
  return filename => {
    if (hasOnlyTag) {
      return anymatch(onlyMatcher, filename)
    }
    const mustSkip = anymatch(skipMatcher, filename)
    return !mustSkip
  }
}

function platformFileFilter (files, platform) {
  const dic = _.reduce(
    (acc, ele) => {
      return {
        ...acc,
        [ele]: true,
      }
    },
    {},
    files,
  )
  return file => {
    // index-only.web.vue
    // index-skip.web.vue
    // index.web.vue
    let [name, _platform, ext] = file.split('.')
    const match = /(.*)(?=(-skip|-only|$))/.exec(name)
    if (match) {
      name = match[1]
    }
    if (!ext) {
      // match index.vue
      ext = _platform
      const result = _.reduce(
        (acc, ele) => {
          if (!acc) {
            return acc
          }
          // 假设web平台构建
          // 当前目录下存在 index-only.web.vue index-skip.web.vue index.web.vue
          // 则不加载index.vue和index-skip.web.vue
          return !dic[`${name}${ele}.${_platform}.${ext}`]
        },
        true,
        ['-only', '-skip', ''],
      )
      return result
    } else {
      // match index.web.vue index.uni.vue.. index.[platform].vue
      return _platform === platform
    }
  }
}

function platformComponentFilter (platform) {
  return component => {
    return !component.platform || component.platform === platform
  }
}

export function resolveComponents (
  options: {componentPath: string, platform: string},
  context: string
): Array<IComponents> {
  const {componentPath, platform} = options
  const absolutePath = resolvePackagePath(componentPath, context)

  const loadComponentsDirectories = dir =>
    _.flowRight(
      _.filter(filepath => fs.statSync(filepath).isDirectory()), 
      _.map(filename => path.join(dir, filename)), 
      fs.readdirSync
    )(dir)

  const loadComponent = dir => {
    const computedDemos = dir => {
      const demoPath = `${dir}/demo/cases`
      if (!fs.existsSync(demoPath)) {
        return []
      }

      const files = fs.readdirSync(demoPath)
      return _.flowRight(
        _.filter(platformFileFilter(files, platform)), 
        _.filter(skipAndOnlyFileFilter(files))
      )(files)
    }
    const componentName = path.basename(dir)
    let componentMeta
    try {
      componentMeta = require(`${dir}/component.js`)
    } catch (error) {
      componentMeta = {
        name: componentName,
      }
    }
    componentMeta.path = `/${componentName}`
    componentMeta.dashedStyledName = componentName
    componentMeta.camelCaseStyledName = toUpperName(componentName)

    return _.defaultsDeep({demoCases: computedDemos(dir)}, componentMeta)
  }

  return _.flowRight(
    _.filter(platformComponentFilter(platform)),
    _.map(loadComponent),
    loadComponentsDirectories
  )(absolutePath)
}

export function resolveCategory (
  options: {componentPath: string, components: Array<IComponents>},
  context: string
) {
  const {componentPath, components} = options

  let category
  try {
    const absolutePath = resolvePackagePath(`${componentPath}/category.json`, context)
    category = loadModule(absolutePath, context)

    if (!category) {
      error(
        `Error loading category.json from ${chalk.bold(componentPath)}: should export an object or a function that returns object.`
      )
      process.exit(0)
    }
  } catch (e) {
    error(`Error loading category.json`)
    throw e
  }

  const categoryMap = _.flowRight(
    _.groupBy('category'),
    _.filter(component => component.demoCases && component.demoCases.length > 0)
  )(components)

  return category.map(item => {
    item.list = categoryMap[item.category]
    return item
  })
}