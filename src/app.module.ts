import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { ConfigModule } from '@nestjs/config'
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import mongoose from 'mongoose';
import { JwtStrategy } from './auth/jwt.strategy';
import AuthUserSchema from './auth/schemas/auth.schema';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env',isGlobal: true}), 
    TaskModule,
    MongooseModule.forFeature([{ name: 'User', schema: AuthUserSchema }]),
    MongooseModule.forRoot(process.env.DB_STRING),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {
  constructor() {
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.log('MongoDB connection error:', err);
    });
  }
}

