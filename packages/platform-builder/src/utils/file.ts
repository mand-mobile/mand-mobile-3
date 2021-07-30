import * as path from 'path'
import * as fs from 'fs-extra'
import * as assert from 'assert'
import * as ejs from 'ejs'
import * as find from 'find'
import * as R from 'ramda'
import _ from 'lodash/fp'
import scopedRegex from 'scoped-regex'

import {resolveModule, loadModule} from './module'
import {error, chalk} from './log'


const timeoutFactory = (timeout: number = 500) => new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error(`[Builder Core] exec async operation timeout!`)), timeout)
})

/**
 * 基于模板文件导出结果
 * @param str 
 * @param target 
 * @param options 
 * @param options.root
 */
export async function exportFile(
  target: string,
  content: string,
  options?: {root?: string, encoding?: string}
): Promise<string> {
  const _options = _.defaultsDeep({root: '/', encoding: 'utf8'}, options)
  const {root, encoding} = _options

  const targetRoot = path.resolve(process.env.MAND_CONTEXT, root)
  const targetPath = path.resolve(targetRoot, target)

  return fs.outputFile(targetPath, content, {encoding}).then(() => targetPath)
}

/**
 * 模板渲染方法
 * @param filename 
 * @param data 
 * @param options 
 * @param options.timeout 模板编译超时时间 模式500ms
 * @param options.root 如果指定了root，在上下文中返回路径信息
 */
export function compileFile(
  file: string,
  data: any,
  options?: {root?: string, timeout?: number}
): Promise<{
  content: string, 
  ctx: {filePath: string, fileRelativePath: string, fileRoot: string}
}> {
  const _options = _.defaultsDeep({root: '/', timeout: 500}, options)
  const {root, timeout} = _options

  const fileRoot = path.resolve(process.env.MAND_CONTEXT, root)
  const filePath = path.resolve(fileRoot, file)
  const fileRelativePath = path.relative(fileRoot, file)
  // 存在相对路径，标识root目录不是文件的父目录, 抛出错误
  if (fileRelativePath.startsWith('..')) {
    error(
      `Can not render file ${chalk.bold(file)}: should be inside [${fileRoot}]`
    )
    process.exit(1)
  }

  const resolver =  new Promise((resolve, reject) => {
    ejs.renderFile(file, data, _options, (err, str) => {
      if (err) {
        reject(err)
      }
      resolve({
        content: str,
        ctx: {
          filePath,
          fileRelativePath,
          fileRoot,
        }
      })
    })
  })

  return Promise.race([resolver, timeoutFactory(timeout) as any])
}

/**
 * 基于模板渲染文件
 * @param filename 
 * @param data 
 * @param options 
 */
export async function renderTemplateFile(
  templateFile: string,
  templateRenderAs: string,
  templateData?: object,
  options?:{sourceRoot?, distRoot?, encoding?, timeout?}
) {
  const {sourceRoot, distRoot, ...compileOptions} = options

  let res 
  try {
    res = await compileFile(templateFile, templateData, {
      root: sourceRoot, 
      ...compileOptions,
    })
  } catch (err) {
    throw(err)
  }

  if (!res) {
    return {}
  }

  const outputFile =  exportFile(templateRenderAs || res.ctx.fileRelativePath, res.content, {
    root: distRoot || res.ctx.fileRoot
  })

  return {
    templateFile,
    outputFile
  }
}

/**
 * 基于模板渲染文件夹
 * @param sourceRoot 
 * @param data 
 * @param options 
 */
export async function renderTemplateDir(
  templateDir: string,
  templateRenderAs: string,
  templateData?: object,
  options?: {sourceRoot?: string, distRoot?: string, ignores?: string[]}
): Promise<any> {
  const {sourceRoot, distRoot, ignores} = options

  const dirRoot = path.resolve(process.env.MAND_CONTEXT, sourceRoot)
  const dirPath = path.resolve(dirRoot, templateDir)

  let files = []

  try {
    files = find.fileSync(dirPath)
  } catch (err) {
    throw(err)
  }

  return Promise.all(files.map(file => {
    if (ignores && ignores.some(ignore => !!~file.indexOf(ignore))) {
      return
    }
    return renderTemplateFile(file, '', templateData, {
      ...options,
      distRoot: path.resolve(distRoot, templateRenderAs)
    })
  }))
}

function checkPackagePath (pkgPath) {
  return /^~|@/.test(pkgPath)
}

function parsePackagePath (pkgPath) {
  if (pkgPath.charAt(0) === '~') {
    pkgPath = pkgPath.slice(1)
  }
  const scoped = pkgPath.charAt(0) === '@'

  let packageName
  if (scoped) {
    packageName = pkgPath.match(scopedRegex())[0] || ''
  } else {
    packageName = pkgPath.split('/')[0]
  }

  return [packageName, pkgPath.replace(packageName, '')]
}

export function resolvePackageDir (pkgName, context) {
  try {
    return path.dirname(resolveModule(`${pkgName}/package.json`, context))
  } catch (err) {
    error(
      `Can not find module ${chalk.bold(pkgName)}: should add it as a dependency for [${context}].`
    )
    process.exit(1)
  } 
}

// 解析绝对、相对路径，或者依赖包路径（需以~开头）
export function resolvePackagePath (pkgPath, context) {
  if (!checkPackagePath(pkgPath)) {
    return pkgPath
  }
  const [pkgName, pkgBase] = parsePackagePath(pkgPath)
  const pkgPathDir = resolvePackageDir(pkgName, context)
  
  // /mand-mobile-next/packages/platform-builder/lib, /platform
  return `${pkgPathDir}${pkgBase}`
}

export function checkPlatformValid (platform, context, platformPath) {
  const absolutePath = resolvePackagePath(platformPath, context)

  if (!fs.existsSync(absolutePath)) {
    error(
      `Error loading builder of ${chalk.bold(platform)}: should provide the builder configration from [platform-builder/platform/${platform}].`
    )
    process.exit(1)
  } 
}

export function resolvePlugins (pluginPath, context) {
  pluginPath = resolvePackagePath(pluginPath, context)
  try {
    return find.fileSync(pluginPath)
  } catch (err) {
    error(
      `Can not find files in ${chalk.bold(pluginPath)}: resolvePlugins`
    )
    process.exit(1)
  }
}

export function resolvePlatforms (platformPath, context) {
  platformPath = resolvePackagePath(platformPath, context)
  try {
    return fs.readdirSync(platformPath)
  } catch (err) {
    error(
      `Can not find platforms in ${chalk.bold(platformPath)}: resolvePlatforms`
    )
    process.exit(1)
  }
}

export function resolveOptions (configPath, context) {
  let fileConfig = {}

  const fileConfigPath = resolvePackagePath(configPath, context)
  if (fileConfigPath && fs.existsSync(fileConfigPath)) {
    try {
      fileConfig = loadModule(fileConfigPath, context)
      
      if (typeof fileConfig === 'function') {
        fileConfig = fileConfig()
      }

      if (!fileConfig || typeof fileConfig !== 'object') {
        // TODO: show throw an Error here, to be fixed in v5
        error(
          `Error loading ${chalk.bold(fileConfigPath)}: should export an object or a function that returns object.`
        )
        fileConfig = {}
      }
    } catch (e) {
      error(`Error loading ${chalk.bold(fileConfigPath)}`)
      throw e
    }
  }

  return fileConfig
}

export function resolveTemplates (templatePath, context) {
  return resolvePackagePath(templatePath, context)
}

export function resolveFileLink (sourceDir, targetDir): Promise<void> {
  return require('execa')('ln', [
    '-sFn',
    sourceDir,
    targetDir,
  ])
}

/**
 * 过滤特定平台文件, 如*.web.js，*.uni.vue
 */
export function filterPlatformedFiles (
  files,
  platform,
  platformList = ['web', 'uni'],
  filter?: (file: string) => boolean
): Array<{path: string, name: string}> {
  if (typeof platformList === 'function') {
    filter = platformList
    platformList = ['web', 'uni']
  }
  const platformFileReg = new RegExp(`^.*\.(${platformList.join('|')})($|\.(\\w+)$)`, 'ig')
  const specialPlatformFileReg = new RegExp(`^.*\.(${platform})($|\.(\\w+)$)`, 'ig')

  return files.filter(file => {
    platformFileReg.lastIndex = 0
    specialPlatformFileReg.lastIndex = 0
    const isPlatformFile = platformFileReg.test(file)
    const isSpecialPlatformFile = specialPlatformFileReg.test(file)
    const isCustomFilter = filter ? filter(file) : true
    return isCustomFilter && (!isPlatformFile || (isPlatformFile && isSpecialPlatformFile))
  }).map(file => {
    const platformPart = `.${platform}`
    let name = file
    if (!!~file.indexOf(platformPart)) {
      name = file.replace(platformPart, '')
    }
    return { path: file, name }
  })
}