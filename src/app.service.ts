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
      .tradeToken('admin', '1234567')
      .then(res => console.log(res))
      .catch(err => console.log(err))
    //   this.commonService
    //     .getItemsByForeignKey(
    //       'TaiKhoan',
    //       'userId',
    //       '40b80e40-dc96-11e9-b654-338e909d341e'
    // {
    //   hoTen: 'Duc Hot Boy',
    //   email: 'ducpm@gmail.com',
    //   soCMND: '123456780',
    //   soDienThoai: '0123456780',
    //   diaChi: '12 Pham Van Dong'
    // }
    // )
    // .then(res => console.log(res))
    return 'Hello World!'
  }
}
