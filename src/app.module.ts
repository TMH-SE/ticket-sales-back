import { GraphqlService } from './config/graphql/graphql.service'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TaiKhoanModule } from './modules/tai-khoan/tai-khoan.module'
import { AuthModule } from './modules/auth/auth.module'
import { CommonModule } from './modules/common/common.module'
import { join } from 'path'
import { GraphqlModule } from './config/graphql/graphql.module'
@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   definitions: {
    //     path: join(process.cwd(), 'src/graphql.ts'),
    //     outputAs: 'class'
    //   }
    // }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlService
    }),
    TaiKhoanModule,
    AuthModule,
    CommonModule,
    GraphqlModule
  ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}
