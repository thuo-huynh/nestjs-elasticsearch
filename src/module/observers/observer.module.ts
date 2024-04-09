import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/api/product/entity/product.entity';
import { ProductElasticIndex } from '../search/index/product.elastic.index';
import { SearchService } from '../search/search.service';
import { ProductSubcriber } from './subscribers/product.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [SearchService, ProductElasticIndex, ProductSubcriber],
})
export class ObserverModule {}
