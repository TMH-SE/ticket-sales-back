import { Resolver, Query } from '@nestjs/graphql'

@Resolver('TaiKhoan')
export class TaiKhoanResolver {
  @Query()
  hello() {
    return {
      id: '123',
      name: 'hieu'
    }
  }
}
