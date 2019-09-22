import { Module } from '@nestjs/common'
import { TaiKhoanService } from './tai-khoan.service'
import { TaiKhoanResolver } from './tai-khoan.resolver';

@Module({
  providers: [TaiKhoanService, TaiKhoanResolver]
})
export class TaiKhoanModule {}
