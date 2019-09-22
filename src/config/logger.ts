import { Logger } from '@nestjs/common'
import chalk from 'chalk'

export default class CustomLogger extends Logger {
  log(message: string) {
    const mess = chalk.whiteBright(message)
    super.log(mess)
  }
  error(message: string, trace: string) {
    const mess = `${chalk.bgRedBright(chalk.white('ERROR:'))} ${chalk.red(
      message
    )}`
    super.error(mess, trace)
  }
  warn(message: string) {
    const mess = `${chalk.bgYellowBright(
      chalk.white('WARNING:')
    )} ${chalk.yellow(message)}`
    super.warn(mess)
  }
  debug(message: string) {
    super.debug(message)
  }
  verbose(message: string) {
    super.verbose(message)
  }
}
