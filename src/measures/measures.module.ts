import { Module } from '@nestjs/common';
import { MeasuresService } from './measures.service';
import { MeasuresController } from './measures.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Measure } from './entities/measure.entity';

@Module({
  controllers: [MeasuresController],
  providers: [MeasuresService],
  imports: [SequelizeModule.forFeature([Measure])],
})
export class MeasuresModule {}
