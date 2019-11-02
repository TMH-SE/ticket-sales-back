import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ApolloError } from 'apollo-server-core'
import { CommonService } from './../common/common.service'
import { ChuyenXeInput, SearchData } from './../../entities/chuyenXe.entity'

@Resolver('ChuyenXe')
export class ChuyenXeResolver {
  constructor(private readonly commonService: CommonService) {}

  @Query()
  async getAllChuyen() {
    try {
      const allChuyen = await this.commonService.getItems(
        'DH2Data',
        'dh2_chuyen'
      )
      const tuyens = {}
      const xes = {}
      const chuyens = allChuyen.map(async chuyen => {
        const {
          id,
          tuyenXeId,
          xeId,
          thoiGianKhoiHanh,
          soGheTrong,
          dsGheTrong
        } = chuyen

        if (!tuyens[tuyenXeId]) {
          const {
            diemDi,
            diemDen,
            quangDuong,
            thoiGian,
            giaVe
          } = await this.commonService.getItemWithKey(
            'DH2Data',
            'dh2_tuyen',
            tuyenXeId
          )
          tuyens[tuyenXeId] = { diemDi, diemDen, quangDuong, thoiGian, giaVe }
        }
        if (!xes[xeId]) {
          const { loaiXe, soGhe } = await this.commonService.getItemWithKey(
            'DH2Data',
            'dh2_xe',
            xeId
          )
          xes[xeId] = { loaiXe, soGhe }
        }
        return {
          id,
          tuyenXeId,
          xeId,
          thoiGianKhoiHanh,
          soGheTrong,
          dsGheTrong,
          ...xes[xeId],
          ...tuyens[tuyenXeId]
        }
      })
      return chuyens
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Query()
  async timChuyen(@Args('searchData') searchData: SearchData) {
    try {
      const { diemDi, diemDen, thoiGianKhoiHanh, soLuong } = searchData
      console.log(thoiGianKhoiHanh)
      console.log(
        new Date(new Date(thoiGianKhoiHanh).toLocaleDateString('vn-VN'))
      )
      console.log(
        new Date(
          new Date(thoiGianKhoiHanh).toLocaleDateString('vn-VN')
        ).setHours(23, 59, 59, 0)
      )
      const data = await this.commonService.getItemsByIndex(
        'DH2Data',
        'TuyenXeIndex',
        '#diemDi = :diemDi and #diemDen = :diemDen',
        null,
        {
          '#diemDi': 'diemDi',
          '#diemDen': 'diemDen'
        },
        {
          ':diemDi': diemDi,
          ':diemDen': diemDen
        }
      )

      const { quangDuong, thoiGian, giaVe } = data[0]

      const chuyens = await this.commonService.getItemsByIndex(
        'DH2Data',
        'ChuyenXeIndex',
        '#pk = :pkVal and #tuyenXeId = :tuyenXeId',
        '#soGheTrong >= :soLuong and #thoiGianKhoiHanh between :date1 and :date2',
        {
          '#pk': 'pk',
          '#tuyenXeId': 'tuyenXeId',
          '#soGheTrong': 'soGheTrong',
          '#thoiGianKhoiHanh': 'thoiGianKhoiHanh'
        },
        {
          ':pkVal': 'dh2_chuyen',
          ':tuyenXeId': data[0].id,
          ':soLuong': soLuong,
          ':date1': thoiGianKhoiHanh,
          ':date2': new Date(
            new Date(thoiGianKhoiHanh).toLocaleDateString('vn-VN')
          ).setHours(23, 59, 59, 0)
        }
      )
      const xes = {}
      const allChuyen = chuyens.map(async chuyen => {
        const { id, xeId, tuyenXeId, soGheTrong, dsGheTrong } = chuyen
        if (!xes[xeId]) {
          const { loaiXe, soGhe } = await this.commonService.getItemWithKey(
            'DH2Data',
            'dh2_xe',
            xeId
          )
          xes[xeId] = { loaiXe, soGhe }
        }
        return {
          id,
          tuyenXeId,
          xeId,
          thoiGianKhoiHanh: chuyen.thoiGianKhoiHanh,
          soGheTrong,
          dsGheTrong,
          quangDuong,
          thoiGian,
          giaVe,
          diemDi,
          diemDen,
          ...xes[xeId]
        }
      })
      return allChuyen
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation()
  async themChuyen(@Args('input') input: ChuyenXeInput) {
    try {
      const { soGhe } = await this.commonService.getItemWithKey(
        'DH2Data',
        'dh2_xe',
        input.xeId
      )
      await this.commonService.createItem('DH2Data', 'dh2_chuyen', {
        ...input,
        soGheTrong: soGhe,
        dsGheTrong: Array.from(Array(soGhe).keys())
      })
      return true
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation()
  async capNhatChuyen(
    @Args('input') input: ChuyenXeInput,
    @Args('id') id: string
  ) {
    try {
      this.commonService.updateItem('DH2Data', 'dh2_chuyen', id, { ...input })
      return true
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation()
  async xoaChuyen(@Args('id') id: string) {
    try {
      const ve = await this.commonService.getItemsByIndex(
        'VeXe',
        'ChuyenXeIdIndex',
        '#chuyenXeId = :chuyenXeId',
        null,
        { '#chuyenXeId': 'chuyenXeId' },
        { ':chuyenXeId': id }
      )
      if (ve.length <= 0) {
        await this.commonService.deleteItem('DH2Data', 'dh2_chuyen', id)
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}
