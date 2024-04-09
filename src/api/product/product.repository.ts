import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/api/product/entity/product.entity';
import { IProductRepository } from 'src/api/product/interface/product.repository.interface';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from '../../common/repositories/base/base.abstract.repository';

@Injectable()
export class ProductRepository
  extends BaseAbstractRepository<Product>
  implements IProductRepository
{
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
}
