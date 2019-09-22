import { Module, Global } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CommonModule } from './../common/common.module'

@Global()
@Module({
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
