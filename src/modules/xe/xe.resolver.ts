import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CommonService } from './../common/common.service'
import { XeInput, Xe } from '@entities'
import { ApolloError } from 'apollo-server-core'

@Resolver('Xe')
export class XeResolver {
  constructor(private readonly commonService: CommonService) {}

  @Query()
  async getAllXe(): Promise<Xe[]> {
    try {
      return await this.commonService.getItems('DH2Data', 'dh2_xe')
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Query()
  async getXe(@Args('id') id: string) {
    try {
      return await this.commonService.getItemWithKey('DH2Data', 'dh2_xe', id)
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation()
  async themXe(@Args('input') input: XeInput) {
    try {
      const data = await this.commonService.getItemsByIndex(
        'DH2Data',
        'BienSoXeIndex',
        '#pk = :pkVal and #bienSoXe = :val',
        null,
        {
          '#pk': 'pk',
          '#bienSoXe': 'bienSoXe'
        },
        {
          ':pkVal': 'dh2_xe',
          ':val': input.bienSoXe
        }
      )
      if (!data[0]) {
        await this.commonService.createItem('DH2Data', 'dh2_xe', { ...input })
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation()
  async capNhatXe(@Args('id') id: string, @Args('input') input: XeInput) {
    try {
      const data = await this.commonService.getItemsByIndex(
        'DH2Data',
        'BienSoXeIndex',
        '#pk = :pkVal and #bienSoXe = :val',
        null,
        {
          '#pk': 'pk',
          '#bienSoXe': 'bienSoXe'
        },
        {
          ':pkVal': 'dh2_xe',
          ':val': input.bienSoXe
        }
      )

      if (!data[0] || data[0].id === id) {
        await this.commonService.updateItem('DH2Data', 'dh2_xe', id, {
          ...input
        })
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  @Mutation()
  async xoaXe(@Args('id') id: string) {
    try {
      this.commonService.deleteItem('DH2Data', 'dh2_xe', id)
      return true
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}
