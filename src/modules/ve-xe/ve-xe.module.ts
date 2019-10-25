import { Module } from '@nestjs/common'
import { VeXeResolver } from './ve-xe.resolver'

@Module({
  providers: [VeXeResolver]
})
export class VeXeModule {}
