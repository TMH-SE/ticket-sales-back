import { Module } from '@nestjs/common'
import { ChuyenXeResolver } from './chuyen-xe.resolver'

@Module({
  providers: [ChuyenXeResolver]
})
export class ChuyenXeModule {}
