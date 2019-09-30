import { Injectable } from '@nestjs/common'
// import { v1 as uuid } from 'uuid'
import { CommonService } from './modules/common/common.service'
import { AuthService } from './modules/auth/auth.service'

@Injectable()
export class AppService {
  constructor(
    private readonly commonService: CommonService,
    private readonly authService: AuthService
  ) {}
  getHello(): string {
    this.authService
      .tradeToken('admin', '12345678')
      .then(res => console.log(res))
      .catch(err => console.log(err))
    return 'Hello World!'
  }
}
