import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUser } from './interface/authUser.interface';
import { LoginUserDto } from './dto/login.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as validator from 'validator'
interface Message {
    msg: string;
}
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly AuthUserModel: Model<AuthUser>) {}

  async create(createUserDto: CreateUserDto) {
    const users = await this.AuthUserModel.find()
    const validationErrors: Message[] = [];
    const validEmail: Message = {
        msg: "Please enter a valid email address." 
    }
    const passwordLength: Message = {
        msg: "Password must be at least 8 characters long",
    }
    const correctPassword: Message = {
        msg: "Passwords do not match" 
    }

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
    return newUser.save()
    
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
