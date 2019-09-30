import { Module } from '@nestjs/common';
import { ChuyenXeService } from './chuyen-xe.service';
import { ChuyenXeResolver } from './chuyen-xe.resolver';

@Module({
  providers: [ChuyenXeService, ChuyenXeResolver]
})
export class ChuyenXeModule {}
