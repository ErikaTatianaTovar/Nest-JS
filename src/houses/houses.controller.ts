import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { House } from './houses.entity';

@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Post()
  async create(@Body() createHouseDto: CreateHouseDto): Promise<House> {
    return this.housesService.create(createHouseDto);
  }

  @Get()
  async findAll(): Promise<House[]> {
    return this.housesService.findAll();
  }

  @Get('code')
  async findOne(@Param('code') code: string): Promise<House> {
    return this.housesService.findOne(code);
  }

  @Patch('code')
  async update(@Param('code') code: string, @Body() updateHouseDto: CreateHouseDto): Promise<House> {
    return this.housesService.update(code, updateHouseDto);
  }

   @Delete('code')
 async delete(@Param('code') code: string): Promise<boolean> {
    return this.housesService.delete(code);
  }
}
