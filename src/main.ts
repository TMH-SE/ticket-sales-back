import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import chalk from 'chalk'
import CustomLogger from './config/logger'
import config from 'config.env'

dotenv.config()

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger()
  })
  const { port } = config
  await app.listen(port)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  console.log(`----------Server start at port: ${chalk.green(port)}-----------`)
}
bootstrap()
