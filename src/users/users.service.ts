import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {} //inyectar el modelo de user

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new HttpException('Not found' + error, HttpStatus.NOT_FOUND);
    }
  }
  async update(id: string, userDto: CreateUserDto): Promise<User> {
    if (userDto.password) {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);

      userDto = {
        ...userDto,
        password: hashedPassword,
      };
    }

    try {
      return await this.userModel.findByIdAndUpdate(id, userDto, { new: true });
    } catch (error) {
      throw new HttpException(
        'error update user' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string): Promise<boolean> {
    
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      if(!user){
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }

      return true;
    } catch (error) {
      throw new HttpException(
        'error delete user' + error,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
