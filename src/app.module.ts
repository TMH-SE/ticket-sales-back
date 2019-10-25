import { GraphqlService } from './config/graphql/graphql.service'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from './modules/auth/auth.module'
import { CommonModule } from './modules/common/common.module'
import { GraphqlModule } from './config/graphql/graphql.module'

import { VeXeModule } from './modules/ve-xe/ve-xe.module'
import { ChuyenXeModule } from './modules/chuyen-xe/chuyen-xe.module'
import { TuyenXeModule } from './modules/tuyen-xe/tuyen-xe.module'
import { XeModule } from './modules/xe/xe.module'
import { NguoiDungModule } from './modules/nguoi-dung/nguoi-dung.module'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlService
    }),
    AuthModule,
    CommonModule,
    GraphqlModule,
    VeXeModule,
    ChuyenXeModule,
    TuyenXeModule,
    XeModule,
    NguoiDungModule
  ]
})
export class AppModule {}
