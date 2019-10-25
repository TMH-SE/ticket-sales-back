import { Injectable, Logger } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-core'
import { NguoiDung } from '@entities'
import { CommonService } from '../common/common.service'
import { isPasswordMatched } from '@utils'

@Injectable()
export class AuthService {
  constructor(private readonly commonService: CommonService) {}
  async generateAccessToken(tk: NguoiDung) {
    const token = await jwt.sign(
      {
        id: tk.id
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '30d'
      }
    )
    return { token, isAdmin: tk.isAdmin }
  }

  async tradeToken(userName: string, password: string) {
    try {
      const taiKhoan = await this.commonService.getTaiKhoan(userName)

      if (!taiKhoan) {
        throw new ApolloError('Unauthorized', '401')
      }

      if (!(await isPasswordMatched(password, taiKhoan.matKhau))) {
        throw new ApolloError('Unauthorized', '401')
      }

      return await this.generateAccessToken(taiKhoan)
    } catch (error) {
      throw new ApolloError(error, error.statusCode || error.extensions.code)
    }
  }

  async verifyToken(token: string) {
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY)
      const account = await this.commonService.getItemWithKey(
        'NguoiDung',
        null,
        decoded.id
      )

      if (!account) {
        throw new ApolloError('Unauthorized', '401')
      } else if (!account.trangThai) {
        throw new ApolloError('Locked', '423')
      }

      return { currentUser: account }
    } catch (error) {
      throw new ApolloError(error, error.extensions.code)
    }
  }
}
