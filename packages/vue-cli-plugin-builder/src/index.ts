import * as path from 'path'
// import WebpackChain from 'webpack-chain/types'

// import {} from '@mand-mobile/platform-builder'


// const commands = ['md-preview', 'md-install']
const commands = ['md-preview']


export = (api:any) => {
  commands.forEach(command => {
    const handler = require(path.resolve(__dirname, `commands/${command}`))
    api.registerCommand(command, handler(api))
  })
}