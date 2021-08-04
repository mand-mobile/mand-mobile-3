import ora from 'ora'
import {
  log, 
  info, 
  done, 
  warn, 
  error, 
  chalk,
} from '@vue/cli-shared-utils'

const spinnerMoon = [
  '🌑',
  '🌒',
  '🌓',
  '🌔',
  '🌕',
  '🌖',
  '🌗',
  '🌘',
]
const spinnerNeon = [
  `                 龙`,
  `               龙哥`,
  `              龙哥保`,
  `            龙哥保佑`,
  `           龙哥保佑 `,
  `          龙哥保佑  `,
  `         龙哥保佑   `,
  `        龙哥保佑    `,
  `       龙哥保佑     `,
  `     龙哥保佑       `,
  `   龙哥保佑         `,
  ` 龙哥保佑           `,
  ` 哥保佑             `,
  ` 保佑               `,
  ` 佑                 `,
  `                    `,
]

export function logWithSpinner (message) {
  return ora({
    text: '\n\n',
    spinner: {
      "interval": 100,
      "frames": spinnerNeon.map((t, i) => {
        return `${spinnerMoon[i % 8]}  ${message} ${chalk.dim.italic(t)}`
      })
    }
  })
}

export {
  log, 
  info, 
  done, 
  warn, 
  error, 
  chalk,
}
