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
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { MeasuresModule } from './measures/measures.module';

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
        autoLoadModels: true,
      }),
    }),
    UsersModule,
    ProductsModule,
    ProvidersModule,
    StockModule,
    RatesModule,
    AuthModule,
    CategoriesModule,
    MeasuresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
