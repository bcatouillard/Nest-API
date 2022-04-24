import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectSchema } from './schema/project.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }])],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
