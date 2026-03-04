import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StockMovements } from './entities/stock.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  controllers: [StockController],
  providers: [StockService],
  imports: [SequelizeModule.forFeature([StockMovements, Product])],
})
export class StockModule {}
