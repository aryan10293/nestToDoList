import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/User.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from 'src/auth/interface/authUser.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
export type User = any;
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly AuthUserModel: Model<AuthUser>) {}
  create(createUserDto: UserDto) {
    return 'This action adds a new user';
  }

  async findOne(email: string): Promise<User | undefined> {
   const users = await this.AuthUserModel.find()
    return users.filter((user) => user.email === email);
  }

 async findProfile(id:string) {
    const user = await this.AuthUserModel.find({_id:id})
    let lol = user[0].toObject()
    delete lol.password
    return lol;
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
