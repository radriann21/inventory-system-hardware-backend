import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Provider } from './entities/provider.entity';
import { CatalogProvider } from './entities/catalog-provider.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService],
  imports: [
    SequelizeModule.forFeature([Provider, CatalogProvider]),
    CacheModule.register(),
  ],
})
export class ProvidersModule {}
