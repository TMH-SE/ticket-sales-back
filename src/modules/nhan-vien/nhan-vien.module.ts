import { Module } from '@nestjs/common';
import { NhanVienService } from './nhan-vien.service';
import { NhanVienResolver } from './nhan-vien.resolver';

@Module({
  providers: [NhanVienService, NhanVienResolver]
})
export class NhanVienModule {}
