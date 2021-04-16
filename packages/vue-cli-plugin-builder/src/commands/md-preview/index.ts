import Builder from '@mand-mobile/platform-builder'

export = (api: any) => async (args: any, rawArgv: any) => {
  const builder = new Builder(process.cwd(), {
    service: 'preview',
    platform: args.platform,
    platformPath: '~@mand-mobile/platform-builder/platform'
  })
  builder.run('serve', args, rawArgv)
}