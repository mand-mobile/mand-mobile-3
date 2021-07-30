import * as path from 'path'

const MAND_COMMANDS = ['md-preview', 'md-install']

export = (api:any) => {
  MAND_COMMANDS.forEach(command => {
    const handler = require(path.resolve(__dirname, `commands/${command}`))
    api.registerCommand(command, handler(api))
  })
}