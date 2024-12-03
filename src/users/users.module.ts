import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import AuthUserSchema from 'src/auth/schemas/auth.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'User', schema: AuthUserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
