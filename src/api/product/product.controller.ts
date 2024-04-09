import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { IProductService } from './interface/product.service.interface';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    @Inject(ProductService)
    private readonly productService: IProductService,
  ) {}

  @Post()
  public async create(@Body() productDto: CreateProductDto): Promise<Product> {
    return this.productService.create(productDto);
  }

  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateProduct: any,
  ): Promise<Product> {
    return this.productService.update(id, updateProduct);
  }

  @Get('/search')
  public async search(@Query() query: any): Promise<any> {
    return this.productService.search(query.q);
  }
}
