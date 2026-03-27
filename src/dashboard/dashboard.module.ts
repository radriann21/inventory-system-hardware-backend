import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/products/entities/product.entity';
import { StockMovements } from 'src/stock/entities/stock.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [SequelizeModule.forFeature([Product, StockMovements, Category])],
})
export class DashboardModule {}
