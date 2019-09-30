import { Module } from '@nestjs/common';
import { VeXeService } from './ve-xe.service';
import { VeXeResolver } from './ve-xe.resolver';

@Module({
  providers: [VeXeService, VeXeResolver]
})
export class VeXeModule {}
