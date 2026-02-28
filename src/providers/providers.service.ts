import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { Op } from 'sequelize';

@Injectable()
export class ProvidersService {
  async createNewProvider(createProviderDto: CreateProviderDto) {
    const provider = await Provider.findOne({
      where: {
        name: createProviderDto.name,
      },
    });

    if (provider) {
      throw new ConflictException('The provider already exists');
    }

    try {
      const newProvider = await Provider.create({ ...createProviderDto });

      return newProvider;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAllProviders() {
    try {
      const providers = await Provider.findAll();
      if (!providers) {
        throw new NotFoundException('Providers not found');
      }
      return providers;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOneProviderByName(name: string) {
    const provider = await Provider.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    if (!provider) {
      throw new NotFoundException('Provider not found');
    }
    return provider;
  }

  async findOneProviderById(id: string) {
    const provider = await Provider.findByPk(id);
    if (!provider) {
      throw new NotFoundException('Provider not found');
    }
    return provider;
  }

  async deleteProvider(id: string) {
    const provider = await Provider.findByPk(id);

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    try {
      await provider?.destroy();
      return { message: 'Provider deleted successfully' };
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateProvider(id: string, updateProviderDto: UpdateProviderDto) {
    const provider = await Provider.findByPk(id);

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    const updatedProvider = await provider?.update({
      ...updateProviderDto,
    });

    if (!updatedProvider) {
      throw new NotFoundException('Provider not found');
    }
    return updatedProvider;
  }
}
