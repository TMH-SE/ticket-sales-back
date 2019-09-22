import { GqlModuleOptions } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server-core'
import { AuthService } from './../../modules/auth/auth.service'

@Injectable()
export class GraphqlService {
  constructor(private readonly authService: AuthService) {}

  async createGqlOptions(): Promise<GqlModuleOptions> {
    const directiveResolvers = {
      isAuthenticated: (next, source, args, ctx) => {
        const { currentUser } = ctx

        if (!currentUser) {
          throw new ApolloError('Unauthorized', '401')
        }

        return next()
      },
      isAdmin: (next, source, args, ctx) => {
        const { isAdmin } = ctx

        if (!isAdmin) {
          throw new ApolloError('Unauthorized', '401')
        }

        return next()
      }
    }
    return {
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      path: '/ticketgraphql',
      directiveResolvers,
      context: async ({ req, res }) => {
        const { token } = req.headers
        let ctx
        if (token) {
          ctx = await this.authService.verifyToken(token)
        }
        return { req, res, ...ctx }
      },
      playground: process.env.NODE_ENV === 'development'
    }
  }
}
