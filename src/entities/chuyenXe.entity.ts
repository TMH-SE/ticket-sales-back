export class ChuyenXe {
  id: string
  tuyenXeId: string
  xeId: string
  thoiGianKhoiHanh: number
  soGheTrong: number
  dsGheTrong: number[]
  trangThai: boolean
}

export interface ChuyenXeRespone {
  id: string
  diemDi: string
  diemDen: string
  thoiGianKhoiHanh: number
  soGheTrong: number
  dsGheTrong: number[]
  loaiXe: string
  quangDuong: number
  thoiGian: number
  giaVe: number
}

export interface ChuyenXeInput {
  tuyenXeId: string
  xeId: string
  thoiGianKhoiHanh: number
}

export interface SearchData {
  diemDi: string
  diemDen: string
  thoiGianKhoiHanh: number
  soLuong: number
}
