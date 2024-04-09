import { Inject, Injectable } from '@nestjs/common';
import { ISearchService } from '../interface/search.interface';
import { SearchService } from '../search.service';
import { productIndex } from '../constant/product.elastic';
import { Product } from 'src/api/product/entity/product.entity';

@Injectable()
export class ProductElasticIndex {
  constructor(
    @Inject(SearchService)
    private readonly searchService: ISearchService<any>,
  ) {}

  private bulkIndex(productId: number): any {
    return {
      _index: productIndex._index,
      _type: productIndex._type,
      _id: productId,
    };
  }

  private productDocument(product: Product): any {
    const bulk = [];
    bulk.push({
      index: this.bulkIndex(product.id),
    });
    bulk.push(product);
    return {
      body: bulk,
      index: productIndex._index,
      type: productIndex._type,
    };
  }
}
