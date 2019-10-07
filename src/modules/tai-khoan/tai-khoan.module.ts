import { Module } from '@nestjs/common'
import { TaiKhoanResolver } from './tai-khoan.resolver'

@Module({
  providers: [TaiKhoanResolver]
})
export class TaiKhoanModule {}
