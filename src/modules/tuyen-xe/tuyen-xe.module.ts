import { Module } from '@nestjs/common';
import { TuyenXeService } from './tuyen-xe.service';
import { TuyenXeResolver } from './tuyen-xe.resolver';

@Module({
  providers: [TuyenXeService, TuyenXeResolver]
})
export class TuyenXeModule {}
