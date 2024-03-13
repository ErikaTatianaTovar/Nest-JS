import { Module } from '@nestjs/common';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HouseSchema } from './houses.schema';
import { CityValidator } from './dto/validations/city.validator';
import { StateValidator } from './dto/validations/state.validator';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'House', schema: HouseSchema }])],
  controllers: [HousesController],
  providers: [HousesService, CityValidator, StateValidator],
})
export class HousesModule {}
