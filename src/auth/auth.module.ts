import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import AuthUserSchema from './schemas/auth.schema';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: AuthUserSchema }]), 
  PassportModule, 
  JwtModule.register({
      secret: process.env.KEY, // Replace with environment variable
      signOptions: { expiresIn: '1h' },
    }),
  ], 
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy],
})
export class AuthModule {}
