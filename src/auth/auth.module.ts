import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import AuthUserSchema from './schemas/auth.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: AuthUserSchema }]) ], 
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
