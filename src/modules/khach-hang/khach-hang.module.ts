import { Module } from '@nestjs/common';
import { KhachHangService } from './khach-hang.service';
import { KhachHangResolver } from './khach-hang.resolver';

@Module({
  providers: [KhachHangService, KhachHangResolver]
})
export class KhachHangModule {}
