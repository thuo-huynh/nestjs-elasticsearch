import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Product } from 'src/api/product/entity/product.entity';
import { ProductElasticIndex } from 'src/module/search/index/product.elastic.index';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
@Injectable()
export class ProductSubcriber implements EntitySubscriberInterface<Product> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly productEsIndex: ProductElasticIndex,
  ) {
    connection.subscribers.push(this);
  }

  public listenTo(): any {
    return Product;
  }

  public async afterInsert(event: InsertEvent<Product>): Promise<any> {
    console.log(
      '🚀 ~ ProductSubcriber ~ afterInsert ~ event.entity:',
      event.entity,
    );
    return this.productEsIndex.insertProductDocument(event.entity as Product);
  }

  public async afterUpdate(event: UpdateEvent<Product>): Promise<any> {
    return this.productEsIndex.updateProductDocument(event.entity as Product);
  }
}
