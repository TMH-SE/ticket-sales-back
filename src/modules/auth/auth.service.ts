import { Injectable, Logger } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-core'
import { TaiKhoan } from '@entities'
import { CommonService } from '../common/common.service'
import { isPasswordMatched } from '@utils'

@Injectable()
export class AuthService {
  constructor(private readonly commonService: CommonService) {}
  async generateAccessToken(tk: TaiKhoan) {
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
      let taiKhoan
      await this.commonService
        .getTaiKhoan(userName)
        .then(res => {
          if (!res) {
            throw new ApolloError('Unauthorized', '401')
          } else {
            taiKhoan = res
          }
        })
        .catch(err => {
          Logger.error(err)
          throw new ApolloError(err, '500')
        })
      if (!taiKhoan.trangThai) {
        throw new ApolloError('Locked', '423')
      }
      if (!(await isPasswordMatched(password, taiKhoan.matKhau))) {
        throw new ApolloError('Unauthorized', '401')
      }
      return await this.generateAccessToken(taiKhoan)
    } catch (error) {
      throw new ApolloError(error, error.extensions.code)
    }
  }

  async verifyToken(token: string) {
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY)
      let account
      let user
      await this.commonService
        .getOneItem('TaiKhoan', decoded.id)
        .then(res => (account = res))
        .catch(err => {
          Logger.error(err)
          throw new ApolloError(err, '500')
        })
      const isAdmin = account.isAdmin
      if (!account) {
        throw new ApolloError('Unauthorized', '401')
      } else if (!account.trangThai) {
        throw new ApolloError('Locked', '423')
      } else if (isAdmin) {
        await this.commonService
          .getOneItem('NhanVien', account.userId)
          .then(res => (user = res))
          .catch(err => {
            Logger.error(err)
            throw new ApolloError(err, '500')
          })
      } else {
        await this.commonService
          .getOneItem('KhachHang', account.userId)
          .then(res => (user = res))
          .catch(err => {
            Logger.error(err)
            throw new ApolloError(err, '500')
          })
      }
      return { currentUser: user, isAdmin }
    } catch (error) {
      throw new ApolloError(error, error.extensions.code)
    }
  }
}
