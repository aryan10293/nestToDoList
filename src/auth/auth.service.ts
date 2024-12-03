import { BadRequestException, Injectable, UseGuards, Request} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUser } from './interface/authUser.interface';
import { LoginUserDto } from './dto/login.user.dto';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as validator from 'validator'
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
interface Message {
    msg: string;
}
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly AuthUserModel: Model<AuthUser>, private usersService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  async create(createUserDto: CreateUserDto, @Request() req:any) {
    
    const users = await this.AuthUserModel.find()
    const validationErrors: Message[] = [];

    if (!validator.isEmail(createUserDto.email)){
      throw new BadRequestException({
        message: 'Validation failed',
        errors: validationErrors,
      });
    }

    if (!validator.isEmail(createUserDto.email)){
      throw new BadRequestException({
        message: 'Validation failed',
        errors: ' email format aint right brother',
      });
    }

     if (!validator.isLength(createUserDto.password, { min: 8 })){
      throw new BadRequestException({
        message: 'password Validation failed',
        errors: 'password aint long enough brother',
      });
     }

     if (createUserDto.password !== createUserDto.confirmPassword){
      throw new BadRequestException({
        message: 'password Validation failed',
        errors: 'passwords do not match',
      });
     }

    for(let i = 0; i<users.length; i++){
      if(users[i].email === createUserDto.email){
        throw new BadRequestException({
          message: 'email is already being used',
        });
      } else if(users[i].name === createUserDto.name){
        throw new BadRequestException({
          message: 'name is already being used',
        });
      }
    }
    const newUser = await this.AuthUserModel.create(createUserDto)
    await newUser.save()
    let user = await this.validateUser(createUserDto.name, createUserDto.password)

    console.log(user, 'lol')
    return user
  }

  async validateUser(name: string, pass: string): Promise<any> {
    let user = await this.usersService.findOne(name);
    user = user[0]
    let isMatch = await bcrypt.compare(pass, user.password)
    if (user && isMatch) {
      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;
      return userWithoutPassword;
    }
    return null;
  }

  findAll() {
    return `This action returns all auth`;
  }

  // postLogin(loginUserDto: LoginUserDto){
  //   console.log(loginUserDto)
  //   return `${loginUserDto.password} and ${loginUserDto.email} this should login users`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
