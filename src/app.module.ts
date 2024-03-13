import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HousesModule } from './houses/houses.module';
import * as dotenv from 'dotenv';

dotenv.config(); //cargar variable de configuración

@Module({
  imports: [UsersModule, MongooseModule.forRoot(process.env.DB_URL), HousesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
