import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import AuthUserSchema from 'src/auth/schemas/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'User', schema: AuthUserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
