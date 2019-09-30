import { Module } from '@nestjs/common'
import { PhuongTienService } from './phuong-tien.service'
import { PhuongTienResolver } from './phuong-tien.resolver'

@Module({
  providers: [PhuongTienService, PhuongTienResolver]
})
export class PhuongTienModule {}
