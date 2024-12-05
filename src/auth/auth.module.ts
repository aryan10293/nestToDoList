import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import AuthUserSchema from './schemas/auth.schema';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: AuthUserSchema }]), 
    ConfigModule.forRoot({envFilePath: '.env',isGlobal: true}),
    PassportModule.register({ session: false }), 
    JwtModule.register({
        secret: process.env.KEY, // Replace with environment variable
        signOptions: { expiresIn: '1h' },
      }),
  ], 
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
console.log()