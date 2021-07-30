import * as fs from 'fs'
import fsExtra from 'fs-extra'
import find from 'find'

import Plugin from './Plugin'
import Options, {defineOptions} from './Options'
import type {OptionsType} from './Options'
import {
  checkPlatformValid,
  resolvePackagePath,
  resolvePlatforms,
  resolvePlugins,
  resolveOptions,
  resolveTemplates,
  resolveFileLink,
  renderTemplateFile,
  renderTemplateDir,
  chalk,
  warn,
  error
} from './utils'

export interface IBuilderCommands {
  [name: string]: (...args) => Promise<void>
}

export {defineOptions}

export default class Builder {
  public plugins: any
  public projectOptions: any
  public templates: any
  public context: any
  public pkgContext: string
  public platform: string
  public platformList: Array<string>
  public service: string
  public _plugins: Array<string>
  public platformPath: string
  public projectDir: string
  public initialized: boolean
  public linkFiles: Array<{source: string, target: string}>
  public commands: IBuilderCommands

  constructor (context, {platform, service, plugins, platformPath}) {
    checkPlatformValid(platform, context, platformPath)
    this.initialized = false
    this.pkgContext = context
    this.platform = platform
    this.platformList = []
    this.service = service
    this._plugins = plugins || []
    this.commands = {}
    this.context = {}
    this.linkFiles = []
    this.platformPath = platformPath

    process.env.MAND_PLATFORM = platform
    process.env.MAND_CONTEXT = context
  }

  // @param target: single component name
  async init (target: string) {
    if (this.initialized) {
      return
    }
    this.initialized = true
    
    const userOptions = this.loadUserOptions()
    const projectOptions: OptionsType = new Options(userOptions, this).options
    const projectDir = `${projectOptions.tempDir}/${this.platform}`
    
    this.projectOptions = projectOptions
    this.projectDir = projectDir

    this.plugins = this.resolvePlugins()
    this.templates = [{
      template: this.resolveTemplates(),
      renderAs: '.'
    }]
    this.platformList = resolvePlatforms(this.platformPath, this.pkgContext)

    // apply plugins.
    this.plugins.forEach(({ id, apply }) => {
      const pluginIns = new Plugin(id, this)
      apply(pluginIns, {
        target,
        platform: this.platform,
        platformList: this.platformList,
        service: this.service,
        pkgContext: this.pkgContext,
        context: this.context,
        projectDir,
        projectOptions
      })
      return [pluginIns]
    })

    await this.renderTemplate(target)
    await this.resolveLinkFiles()
  }

  async run (name, args: any = {}, rawArgv = []) {
    process.env.MAND_UNIT = args.unit

    await this.init(args['component-name'] || '')

    setTimeout(() => {
      const command = this.commands[name]
      if (!command && name) {
        error(`command "${name}" does not exist.`)
        process.exit(1)
      }
      return command(args, rawArgv)
    }, 300)
  }

  resolvePlugins () {
    const {pkgContext, platform, service, platformPath} = this

    const idToPlugin = (id, absolutePath?) => {
      const module = require(absolutePath || id)
      return {
        id: id.replace(/^.\//, 'built-in:'),
        apply: module.default || module
      }
    }

    const builtInPlugins = [
      './builtin-plugins/platform-setup',
      './builtin-plugins/component-setup',
      ...this._plugins.map(
        plugin => resolvePackagePath(plugin, pkgContext)
      )
    ]
    const platformPlugins = resolvePlugins(`${platformPath}/${platform}/${service}/plugin`, pkgContext)
    return (builtInPlugins.concat(platformPlugins)).map(id => idToPlugin(id))
  }

  async resolveLinkFiles () {
    const {linkFiles, projectDir} = this
    await Promise.all(linkFiles.map(links => {
      if (links.source && links.target) {
        return resolveFileLink(links.source, `${projectDir}/${links.target}`)
      }
    }))
  }

  resolveTemplates () {
    const {pkgContext, platform, service, platformPath} = this
    return resolveTemplates(`${platformPath}/${platform}/${service}/template`, pkgContext)
  }

  loadUserOptions () {
    const {pkgContext, platform, service, platformPath} = this
    return resolveOptions(`${platformPath}/${platform}/${service}/builder.config.js`, pkgContext)
  }

  async renderTemplate (target: string) {
    // const {tempDir} = this.projectOptions
    const {components, componentsSortByCategory: category} = this.context
    const distRoot = this.projectDir
    const templates = this.templates || []
    
    fsExtra.emptyDirSync(distRoot)

    await Promise.all(
      templates.map(({template, templateData, renderAs, ignores}) => {
        const data = {
          target,
          components,
          category,
          ...templateData
        }
        if (!fs.existsSync(template)) {
          // warn(`Missing template ${chalk.bold(template)}: rendering [${renderAs}]`)
          return
        }
        if (fs.statSync(template).isFile()) {
          return renderTemplateFile(template, renderAs, data, {
            sourceRoot: '/',
            distRoot,
          }).catch(err => {
            error(`File rendering errors: ${chalk.bold(template)} \n\n ${err.message}`)
          })
        } else {
          return renderTemplateDir(template, renderAs, data, {
            sourceRoot: template,
            distRoot,
            ignores,
          }).catch(err => {
            warn(`Directory rendering errors: ${chalk.bold(template)} \n\n ${err.message}`)
          })
        }
      })
    )
  }
}