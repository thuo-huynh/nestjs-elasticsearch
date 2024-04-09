import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/api/product/product.repository';
import { SearchService } from 'src/module/search/search.service';
import { Product } from './entity/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductRepository, ProductService, SearchService],
  controllers: [ProductController],
})
export class ProductModule {}
