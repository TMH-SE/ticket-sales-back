export class VeXe{
  id: string
  chuyenXeId: string
  khachHangId: string
  khachHangInfo: KhachHangInfo
  viTriGhe: number
  trangThai: boolean
}

export interface KhachHangInfo {
  hoTen: string
  email: string
  soCMND: string
  soDienThoai: string
  diaChi: string
}

export interface VeInput {
  chuyenXeId: string
  khachHangInfo: KhachHangInfo
  viTriGhe: number[]
}
