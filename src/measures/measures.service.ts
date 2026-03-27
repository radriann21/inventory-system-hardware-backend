import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CreateMeasureDto } from './dto/create-measure.dto';
import { UpdateMeasureDto } from './dto/update-measure.dto';
import { Measure } from './entities/measure.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class MeasuresService {
  constructor(
    @InjectModel(Measure)
    private readonly measureModel: typeof Measure,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(createMeasureDto: CreateMeasureDto) {
    const measure = await this.measureModel.findOne({
      where: {
        name: createMeasureDto.name,
      },
    });

    if (measure) {
      throw new ConflictException('The measure already exists');
    }

    try {
      const newMeasure = await this.measureModel.create({
        ...createMeasureDto,
      });

      await this.cacheManager.del('measures');

      return newMeasure;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAll() {
    const cacheKey = 'measures';
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const measures = await this.measureModel.findAll({
        where: {
          is_active: true,
        },
      });

      await this.cacheManager.set(cacheKey, measures, 3600000);

      return measures;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOne(id: number) {
    const cacheKey = `measure-${id}`;
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    const measure = await this.measureModel.findByPk(id);

    if (!measure) {
      throw new NotFoundException('Measure not found');
    }

    await this.cacheManager.set(cacheKey, measure, 3600000);

    return measure;
  }

  async update(id: number, updateMeasureDto: UpdateMeasureDto) {
    const measure = await this.measureModel.findByPk(id);

    if (!measure) {
      throw new NotFoundException('Measure not found');
    }

    if (updateMeasureDto.name && updateMeasureDto.name !== measure.name) {
      const existingMeasure = await this.measureModel.findOne({
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

      await this.cacheManager.del('measures');
      await this.cacheManager.del(`measure-${id}`);

      return measure;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async remove(id: number) {
    const measure = await this.measureModel.findByPk(id);

    if (!measure) {
      throw new NotFoundException('Measure not found');
    }

    try {
      await measure.update({ is_active: false });
      await this.cacheManager.del('measures');
      await this.cacheManager.del(`measure-${id}`);

      return { message: 'Measure deactivated successfully' };
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
