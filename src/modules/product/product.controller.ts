import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: any,
    @Body() product: CreateProductDto,
  ): Promise<Product> {
    return this.productService.create({ image, ...product });
  }

  @Get()
  async findAll() {
    console.log('Here in controller get---');
    return await this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
