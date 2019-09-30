import { Module } from '@nestjs/common';
import { HoaDonService } from './hoa-don.service';
import { HoaDonResolver } from './hoa-don.resolver';

@Module({
  providers: [HoaDonService, HoaDonResolver]
})
export class HoaDonModule {}
