import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

// Modules
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProvidersModule } from './providers/providers.module';
import { StockModule } from './stock/stock.module';
import { RatesModule } from './rates/rates.module';

// Entities
import { User } from './users/entities/user.entity';
import { StockMovements } from './stock/entities/stock.entity';
import { Rate } from './rates/entities/rate.entity';
import { Provider } from './providers/entities/provider.entity';
import { Product } from './products/entities/product.entity';
import { Measure } from './products/entities/measure.entity';
import { AuthModule } from './auth/auth.module';
import { CatalogProvider } from './providers/entities/catalog-provider.entity';
import { Category } from './categories/entities/category.entity';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        synchronize: false,
        models: [
          User,
          StockMovements,
          Rate,
          Provider,
          Product,
          Measure,
          CatalogProvider,
          Category,
        ],
      }),
    }),
    UsersModule,
    ProductsModule,
    ProvidersModule,
    StockModule,
    RatesModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
