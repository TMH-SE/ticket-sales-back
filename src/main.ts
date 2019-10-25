import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import chalk from 'chalk'
import CustomLogger from './common/loggers/logger'
import config from './config.env'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'
import { ValidationPipePipe } from './common/pipes/validation-pipe.pipe'

dotenv.config()

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger()
  })
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalPipes(new ValidationPipePipe())
  const { port } = config
  await app.listen(port)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  console.log(`----------Server start at port: ${chalk.green(port)}-----------`)
}
bootstrap()
