import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { ApolloError } from 'apollo-server-express'
import { CommonService } from './../common/common.service'
import { TuyenXeInput, TuyenXe } from '@entities'

@Resolver('TuyenXe')
export class TuyenXeResolver {
  constructor(private readonly commonService: CommonService) {}
  @Query()
  async getAllTuyen() {
    try {
      return await this.commonService.getItems('DH2Data', 'dh2_tuyen')
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Query()
  async getTuyenXe(@Args('id') id: string) {
    try {
      return await this.commonService.getItemWithKey('DH2Data', 'dh2_tuyen', id)
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Query()
  async getTuyenByHanhTrinh(
    @Args('diemDi') diemDi: string,
    @Args('diemDen') diemDen: string
  ) {
    try {
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
      return data[0]
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation()
  async themTuyen(@Args('input') input: TuyenXeInput) {
    try {
      const data = await this.getTuyenByHanhTrinh(input.diemDi, input.diemDen)
      if (!data) {
        this.commonService.createItem('DH2Data', 'dh2_tuyen', { ...input })
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation()
  async capNhatTuyen(
    @Args('id') id: string,
    @Args('input') input: TuyenXeInput
  ) {
    try {
      const data = await this.getTuyenByHanhTrinh(input.diemDi, input.diemDen)
      if (!data || data.id === id) {
        this.commonService.updateItem('DH2Data', 'dh2_tuyen', id, { ...input })
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation()
  async xoaTuyen(@Args('id') id: string) {
    try {
      const data = await this.commonService.getItemsByIndex(
        'DH2Data',
        'ChuyenXeIndex',
        '#pk = :pk and #tuyenXeId = :tuyenXeId',
        null,
        {
          '#pk': 'pk',
          '#tuyenXeId': 'tuyenXeId'
        },
        {
          ':pk': 'dh2_chuyen',
          ':tuyenXeId': id
        }
      )
      if (data.length <= 0) {
        this.commonService.deleteItem('DH2Data', 'dh2_tuyen', id)
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}
