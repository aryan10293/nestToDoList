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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req:any) {
    // console.log(this.AuthUserModel.find({_id:req.user.userId}))
    // return {userId: req.user.userId};
  }
}
