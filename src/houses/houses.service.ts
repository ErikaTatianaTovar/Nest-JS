import { HttpException, HttpStatus,Injectable } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { InjectModel } from '@nestjs/mongoose';
import { House } from './houses.entity';
import { Model } from 'mongoose';

@Injectable()
export class HousesService {
  constructor(@InjectModel('House') private readonly houseModel: Model<House>) {} //inyectar el modelo de House

  async create(createHouseDto: CreateHouseDto): Promise<House> {
    try {
      const createdHouse = new this.houseModel(createHouseDto);
      return await createdHouse.save();
    } catch (error) {
      throw new HttpException('Error creating house', HttpStatus.BAD_REQUEST);
    }
  }

  findAll(): Promise<House[]>  {
    return this. houseModel.find().exec();
  }

  async findOne(code: string): Promise<House>{
    try {
      return await this.houseModel.findById(code);
    } catch (error) {
      throw new HttpException('Not found' + error, HttpStatus.NOT_FOUND);
    }
  }

  async update(code: string,houseDto: CreateHouseDto): Promise<House> {
    try {
      return await this.houseModel.findByIdAndUpdate(code, houseDto, { new: true });
    } catch (error) {
      throw new HttpException(
        'error update user' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  

  async delete(code: string): Promise<boolean> {
    try {
      const house = await this.houseModel.findByIdAndDelete(code);
      if (!house) {
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
