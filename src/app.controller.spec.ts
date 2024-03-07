import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HousesController } from './houses/houses.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('ruta')],
  controllers: [AppController, HousesController],
  providers: [AppService],
})
export class AppModule {}
