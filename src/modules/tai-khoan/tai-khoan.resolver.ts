import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { AuthService } from './../auth/auth.service'

@Resolver('TaiKhoan')
export class TaiKhoanResolver {
  constructor(private readonly authService: AuthService) {}

  @Query()
  async me(@Context('currentUser') currentUser: any) {
    return currentUser
  }

  @Mutation()
  async login(
    @Args('userName') username: string,
    @Args('password') password: string
  ) {
    const { token } = await this.authService.tradeToken(username, password)
    return { token }
  }

  @Mutation()
  async loginAdmin(
    @Args('userName') username: string,
    @Args('password') password: string
  ) {
    const { token, isAdmin } = await this.authService.tradeToken(
      username,
      password
    )
    return isAdmin ? { token } : null
  }
}
