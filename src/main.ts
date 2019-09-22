import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import chalk from 'chalk'
import CustomLogger from './config/logger'

declare const module: any

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger()
  })
  const { PORT } = process.env
  await app.listen(PORT || 3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  console.log(`----------Server start at port: ${chalk.green(PORT)}-----------`)
}
bootstrap()
