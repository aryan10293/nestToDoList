import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
   create(@Body() createAuthDto: CreateUserDto,   @Request() req: any ) {
    return this.authService.create(createAuthDto, req);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() loginUserDto:LoginUserDto, req:any) {
      return this.authService.login(loginUserDto.user);
      return loginUserDto.user
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('lol')
    return req.user;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Post('login')
  // postLogin(@Body() loginUserDto:LoginUserDto){
  //   return this.authService.postLogin(loginUserDto)
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
