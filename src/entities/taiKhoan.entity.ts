export class TaiKhoan {
  id: string
  tenDangNhap: string
  matKhau: string
  isAdmin: boolean
  trangThai: boolean

  constructor(args) {
    if (args) {
      Object.assign(this, args)
    }
  }
}
