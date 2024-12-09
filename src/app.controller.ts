import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Model } from 'mongoose';
import { AuthUser } from './auth/interface/authUser.interface';
@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
    ) {}

  @Get()
  getProfile(@Request() req:any) {
    return 'hey does this work'
  }
}
