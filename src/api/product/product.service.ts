import { Inject, Injectable } from '@nestjs/common/decorators';
import { ProductRepository } from 'src/api/product/product.repository';
import { ISearchService } from 'src/module/search/interface/search.interface';
import { SearchService } from 'src/module/search/search.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { IProductRepository } from './interface/product.repository.interface';
import { IProductService } from './interface/product.service.interface';
import { ProductSearchObject } from './model/product.search.object';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: IProductRepository,
    @Inject(SearchService)
    private readonly searchService: ISearchService<any>,
  ) {}

  public async create(productDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.name = productDto.name;
    product.description = productDto.description;
    product.price = productDto.price;
    return this.productRepository.create(product);
  }

  public async update(productId: any, updateProduct: any): Promise<Product> {
    const product = await this.productRepository.findOneById(productId);
    product.name = updateProduct.name;
    product.description = updateProduct.description;
    product.price = updateProduct.price;
    return this.productRepository.create(product);
  }

  public async search(q: any): Promise<any> {
    const data = ProductSearchObject.searchObject(q);
    return this.searchService.searchIndex(data);
  }
}
