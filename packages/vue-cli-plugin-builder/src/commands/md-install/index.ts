import Builder from '@mand-mobile/platform-builder'

// const targetTable =  {
//   'lib': (options: any = {}) => [VueifySFCBuilderPlugin, options],
//   'sfc': (options: any = {}) => [VueSFCBuilderPlugin, options],
//   'bundle': (options: any = {}) => [RollupBuilderPlugin, options],
// }

export = (api: any) => async (args: any, rawArgv: any) => {
  const builder = new Builder(process.cwd(), {
    service: 'install',
    platform: args.platform,
    platformPath: '~@mand-mobile/platform-builder/platform',
    plugins: [
      '~@mand-mobile/platform-builder/lib/builtin-plugins/sfc-build.js',
      '~@mand-mobile/platform-builder/lib/builtin-plugins/vueify-build.js',
      '~@mand-mobile/platform-builder/lib/builtin-plugins/rollup-build.js',
    ]
  })
  builder.run('service', args, rawArgv)
}