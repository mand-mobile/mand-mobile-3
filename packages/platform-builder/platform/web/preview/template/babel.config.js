module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'mand-mobile',
        libraryDirectory: 'lib'
      }
    ],
    [
      '@mand-mobile/platform-builder/lib/babel-plugins/babel-transform-platform',
      { 
        platform: process.env.MAND_PLATFORM
      }
    ]
  ]
}