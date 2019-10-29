import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { ApolloError } from 'apollo-server-core'
import { CommonService } from './../common/common.service'
import { VeInput } from '@entities'

@Resolver('VeXe')
export class VeXeResolver {
  constructor(private readonly commonService: CommonService) {}
  @Mutation()
  async themVe(@Args('input') input: VeInput) {
    try {
      const {
        dsGheTrong,
        soGheTrong
      } = await this.commonService.getItemWithKey(
        'DH2Data',
        'dh2_chuyen',
        input.chuyenXeId
      )
      input.viTriGhe.map(async pos => {
        await this.commonService.createItem('VeXe', null, {
          ...input,
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
}
