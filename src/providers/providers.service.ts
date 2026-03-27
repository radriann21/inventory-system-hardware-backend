import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectModel(Provider)
    private readonly providerModel: typeof Provider,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async createNewProvider(createProviderDto: CreateProviderDto) {
    const provider = await this.providerModel.findOne({
      where: {
        name: createProviderDto.name,
      },
    });

    if (provider) {
      throw new ConflictException('The provider already exists');
    }

    try {
      const newProvider = await this.providerModel.create({
        ...createProviderDto,
      });

      await this.cacheManager.del('providers');

      return newProvider;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAllProviders() {
    const cacheKey = 'providers';
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const providers = await this.providerModel.findAll();
      if (!providers || providers.length === 0) {
        throw new NotFoundException('Providers not found');
      }

      await this.cacheManager.set(cacheKey, providers, 1800000);

      return providers;
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOneProviderByName(name: string) {
    const cacheKey = `provider-name-${name.toLowerCase()}`;
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    const provider = await this.providerModel.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    await this.cacheManager.set(cacheKey, provider, 1800000);

    return provider;
  }

  async findOneProviderById(id: string) {
    const cacheKey = `provider-${id}`;
    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

    const provider = await this.providerModel.findByPk(id);
    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    await this.cacheManager.set(cacheKey, provider, 1800000);

    return provider;
  }

  async deleteProvider(id: string) {
    const provider = await this.providerModel.findByPk(id);

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    try {
      await provider?.destroy();
      await this.cacheManager.del('providers');
      await this.cacheManager.del(`provider-${id}`);

      return { message: 'Provider deleted successfully' };
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateProvider(id: string, updateProviderDto: UpdateProviderDto) {
    const provider = await this.providerModel.findByPk(id);

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    const updatedProvider = await provider?.update({
      ...updateProviderDto,
    });

    if (!updatedProvider) {
      throw new NotFoundException('Provider not found');
    }

    await this.cacheManager.del('providers');
    await this.cacheManager.del(`provider-${id}`);

    return updatedProvider;
  }
}
