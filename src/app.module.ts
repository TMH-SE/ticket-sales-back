import { GraphqlService } from './config/graphql/graphql.service'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TaiKhoanModule } from './modules/tai-khoan/tai-khoan.module'
import { AuthModule } from './modules/auth/auth.module'
import { CommonModule } from './modules/common/common.module'
import { GraphqlModule } from './config/graphql/graphql.module'
import { KhachHangModule } from './modules/khach-hang/khach-hang.module'
import { NhanVienModule } from './modules/nhan-vien/nhan-vien.module';
import { HoaDonModule } from './modules/hoa-don/hoa-don.module';
import { VeXeModule } from './modules/ve-xe/ve-xe.module';
import { ChuyenXeModule } from './modules/chuyen-xe/chuyen-xe.module';
import { TuyenXeModule } from './modules/tuyen-xe/tuyen-xe.module';
import { PhuongTienModule } from './modules/phuong-tien/phuong-tien.module';
@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlService
    }),
    TaiKhoanModule,
    AuthModule,
    CommonModule,
    GraphqlModule,
    KhachHangModule,
    NhanVienModule,
    HoaDonModule,
    VeXeModule,
    ChuyenXeModule,
    TuyenXeModule,
    PhuongTienModule
  ],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}
