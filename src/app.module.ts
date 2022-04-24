import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [ConfigModule.forRoot()  ,MongooseModule.forRoot(process.env.MONGODB_URI), ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
