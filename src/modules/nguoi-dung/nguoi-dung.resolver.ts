import { Resolver, Query, Context, Mutation, Args } from '@nestjs/graphql'
import { ApolloError } from 'apollo-server-core'
import { AuthService } from './../auth/auth.service'
import { NguoiDungInput, NguoiDung } from '@entities'
import { CommonService } from './../common/common.service'
import { isPasswordMatched, hashPassword } from '@utils'
import { v1 } from 'uuid'

@Resolver('NguoiDung')
export class NguoiDungResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly commonService: CommonService
  ) {}
  @Query()
  async me(@Context('currentUser') currentUser: any) {
    console.log(v1())
    return currentUser
  }

  @Query()
  async getAllNguoiDung() {
    try {
      return await this.commonService.getItems('NguoiDung', null)
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation()
  async login(
    @Args('userName') username: string,
    @Args('password') password: string
  ) {
    return await this.authService.tradeToken(username, password)
  }

  @Mutation()
  async dangKyTaiKhoan(@Args('input') input: NguoiDungInput) {
    try {
      const { tenDangNhap, email, soCMND, soDienThoai } = input
      const user1 = await this.getUserByUsername(tenDangNhap)
      const user2 = await this.getUserByEmail(email)
      const user3 = await this.getUserByIDNumber(soCMND)
      const user4 = await this.getUserByPhone(soDienThoai)
      if (user1) {
        throw new ApolloError('Tên đăng nhập đã tồn tại', 'Conflict')
      }
      if (user2) {
        throw new ApolloError('Email đã được đăng ký', 'Conflict')
      }
      if (user3) {
        throw new ApolloError('Số CMND đã được đăng ký', 'Conflict')
      }
      if (user4) {
        throw new ApolloError('Số điện thoại này đã được đăng ký', 'Conflict')
      }
      this.commonService.createItem('NguoiDung', null, {
        ...input,
        matKhau: await hashPassword(input.matKhau),
        isAdmin: false
      })
      return true
    } catch (error) {
      throw new ApolloError(error.message)
    }
  }

  @Mutation()
  async capNhatThongTin(
    @Context('currentUser') currentUser: NguoiDung,
    @Args('input') input: NguoiDungInput
  ) {
    try {
      const { id } = currentUser
      const { email, soCMND, soDienThoai } = input
      const user2 = await this.getUserByEmail(email)
      const user3 = await this.getUserByIDNumber(soCMND)
      const user4 = await this.getUserByPhone(soDienThoai)
      if (user2 && user2.id !== id) {
        throw new ApolloError('Email đã được đăng ký', 'Conflict')
      }
      if (user3 && user3.id !== id) {
        throw new ApolloError('Số CMND đã được đăng ký', 'Conflict')
      }
      if (user4 && user4.id !== id) {
        throw new ApolloError('Số điện thoại này đã được đăng ký', 'Conflict')
      }
      await this.commonService.updateItem('NguoiDung', null, id, {
        ...input,
        matKhau: await hashPassword(input.matKhau),
        isAdmin: false
      })
      return true
    } catch (error) {
      console.log(error)
      throw new ApolloError(error.message)
    }
  }

  @Mutation()
  async thayDoiMatKhau(
    @Context('currentUser') currentUser: NguoiDung,
    @Args('oldPassword') oldPassword: string,
    @Args('newPassword') newPassword: string
  ) {
    try {
      if (!isPasswordMatched(oldPassword, currentUser.matKhau)) {
        throw new ApolloError('Mật khẩu cũ của bạn không đúng', 'Unauthorized')
      } else {
        const {
          hoTen,
          email,
          soCMND,
          soDienThoai,
          diaChi,
          tenDangNhap,
          isAdmin,
          trangThai
        } = currentUser
        this.commonService.updateItem('NguoiDung', null, currentUser.id, {
          hoTen,
          email,
          soCMND,
          soDienThoai,
          diaChi,
          tenDangNhap,
          isAdmin,
          trangThai,
          matKhau: await hashPassword(newPassword)
        })
        return true
      }
    } catch (error) {
      throw new ApolloError(error.message)
    }
  }

  async getUserByEmail(email: string) {
    try {
      const data = await this.commonService.getItemsByIndex(
        'NguoiDung',
        'EmailIndex',
        'email = :email',
        {},
        {
          ':email': email
        }
      )
      return data[0]
    } catch (error) {
      throw new ApolloError(error)
    }
  }
  async getUserByPhone(phone: string) {
    try {
      const data = await this.commonService.getItemsByIndex(
        'NguoiDung',
        'PhoneIndex',
        'soDienThoai = :phone',
        {},
        {
          ':phone': phone
        }
      )
      return data[0]
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  async getUserByUsername(username: string) {
    try {
      const data = await this.commonService.getItemsByIndex(
        'NguoiDung',
        'UsernameIndex',
        'tenDangNhap = :usr',
        {},
        {
          ':usr': username
        }
      )
      return data[0]
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  async getUserByIDNumber(idNum: string) {
    try {
      const data = await this.commonService.getItemsByIndex(
        'NguoiDung',
        'IDNumberIndex',
        'soCMND = :idNum',
        {},
        {
          ':idNum': idNum
        }
      )
      return data[0]
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}
