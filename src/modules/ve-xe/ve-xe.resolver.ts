import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql'
import { ApolloError } from 'apollo-server-core'
import { CommonService } from './../common/common.service'
import { VeInput, NguoiDung } from '@entities'

@Resolver('VeXe')
export class VeXeResolver {
  constructor(private readonly commonService: CommonService) {}
  @Mutation()
  async themVe(
    @Context('currentUser') currentUser: NguoiDung,
    @Args('input') input: VeInput
  ) {
    try {
      const {
        dsGheTrong,
        soGheTrong
      } = await this.commonService.getItemWithKey(
        'DH2Data',
        'dh2_chuyen',
        input.chuyenXeId
      )
      const khachHangId = currentUser && currentUser.id
      input.viTriGhe.map(async pos => {
        await this.commonService.createItem('VeXe', null, {
          ...input,
          khachHangId,
          viTriGhe: pos
        })
        const index = dsGheTrong.indexOf(pos)
        dsGheTrong.splice(index, 1)
      })
      await this.commonService.updateItem(
        'DH2Data',
        'dh2_chuyen',
        input.chuyenXeId,
        { dsGheTrong, soGheTrong: soGheTrong - input.viTriGhe.length }
      )
      return true
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Query()
  async getVeXeByKhachHang(@Context('currentUser') currentUser: NguoiDung) {
    try {
      const data = await this.commonService.getItemsByIndex(
        'VeXe',
        'KhachHangIdIndex',
        '#khachHangId = :khachHangId',
        null,
        {
          '#khachHangId': 'khachHangId'
        },
        {
          ':khachHangId': currentUser.id
        }
      )
      const chuyens = {}
      const respone = data.map(async ve => {
        const { id, chuyenXeId, viTriGhe } = ve
        if (!chuyens[chuyenXeId]) {
          const {
            thoiGianKhoiHanh,
            tuyenXeId
          } = await this.commonService.getItemWithKey(
            'DH2Data',
            'dh2_chuyen',
            chuyenXeId
          )
          const {
            diemDi,
            diemDen,
            giaVe
          } = await this.commonService.getItemWithKey(
            'DH2Data',
            'dh2_tuyen',
            tuyenXeId
          )
          chuyens[chuyenXeId] = { thoiGianKhoiHanh, diemDi, diemDen, giaVe }
        }
        return { id, viTriGhe, ...chuyens[chuyenXeId] }
      })
      return respone
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}
