export class NguoiDung {
  id: string
  hoTen: string
  email: string
  soCMND: string
  soDienThoai: string
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

export interface NguoiDungInput {
  hoTen: string
  email: string
  soCMND: string
  soDienThoai: string
  tenDangNhap: string
  matKhau: string
}
