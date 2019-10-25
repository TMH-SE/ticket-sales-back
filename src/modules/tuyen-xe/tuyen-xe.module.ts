import { Module } from '@nestjs/common'
import { TuyenXeResolver } from './tuyen-xe.resolver'

@Module({
  providers: [TuyenXeResolver]
})
export class TuyenXeModule {}
