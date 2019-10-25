import { Module } from '@nestjs/common'
import { XeResolver } from './xe.resolver'

@Module({
  providers: [XeResolver]
})
export class XeModule {}
