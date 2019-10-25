import { Module } from '@nestjs/common'
import { NguoiDungResolver } from './nguoi-dung.resolver'

@Module({
  providers: [NguoiDungResolver]
})
export class NguoiDungModule {}
