import { GqlModuleOptions } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { ApolloError } from 'apollo-server-core'
import { PubSub } from 'graphql-subscriptions'
import { AuthService } from './../../modules/auth/auth.service'

const pubSub = new PubSub()
const endpoint = 'ticketgraphql'

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
        const { currentUser } = ctx

        if (!currentUser.isAdmin) {
          throw new ApolloError('Unauthorized', '401')
        }

        return next()
      }
    }
    return {
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      path: `/${endpoint}`,
      directiveResolvers,
      context: async ({ req, res, connection }) => {
        if (connection) {
          return {
            req: connection.context,
            pubSub
          }
        }
        const { token } = req.headers
        let ctx
        if (token) {
          ctx = await this.authService.verifyToken(token)
        }
        return { req, res, pubSub, ...ctx }
      },
      subscriptions: {
        path: `/${endpoint}`,
        keepAlive: 1000,
        onConnect: (connectionParams, webSocket) => {
          const token = connectionParams['access-token']
          if (token) {
            const ctx = this.authService.verifyToken(token)
            return { ...ctx }
          }
          throw new Error('Missing auth token!')
        }
      },
      playground: process.env.NODE_ENV === 'development'
    }
  }
}
