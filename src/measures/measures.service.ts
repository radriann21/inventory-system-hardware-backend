import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';
import { Measure } from './entities/measure.entity';

@Injectable()
export class MeasuresService {
  async create(createMeasureDto: CreateMeasureDto) {
    const measure = await Measure.findOne({
      where: {
        name: createMeasureDto.name,
      },
    });

    if (measure) {
      throw new ConflictException('The measure already exists');
    }

    try {
      const newMeasure = await Measure.create({ ...createMeasureDto });
      return newMeasure;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAll() {
    try {
      const measures = await Measure.findAll({
        where: {
          is_active: true,
        },
      });
      return measures;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOne(id: number) {
    const measure = await Measure.findByPk(id);

    if (!measure) {
      throw new NotFoundException('Measure not found');
    }

    return measure;
  }

  async update(id: number, updateMeasureDto: UpdateMeasureDto) {
    const measure = await Measure.findByPk(id);

    if (!measure) {
      throw new NotFoundException('Measure not found');
    }

    if (updateMeasureDto.name && updateMeasureDto.name !== measure.name) {
      const existingMeasure = await Measure.findOne({
        where: {
          name: updateMeasureDto.name,
        },
      });

      if (existingMeasure) {
        throw new ConflictException('A measure with this name already exists');
      }
    }

    try {
      await measure.update({ ...updateMeasureDto });
      return measure;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async remove(id: number) {
    const measure = await Measure.findByPk(id);

    if (!measure) {
      throw new NotFoundException('Measure not found');
    }

    try {
      await measure.update({ is_active: false });
      return { message: 'Measure deactivated successfully' };
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
