import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/User.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/findUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post()
  findOne(@Body() findUser:FindUserDto){
    return this.usersService.findOne
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findProfilel(@Request() req:any) {
    console.log(req.user)
    return this.usersService.findProfile(req.user.userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
