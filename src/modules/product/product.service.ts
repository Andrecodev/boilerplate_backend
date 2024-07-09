import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/entities/product.entity';
import { generateUniqueId } from 'src/common/utils/tools.utils';
import { CreateProductDto } from './dto/create-product.dto';
import { DynamoProductRepository } from 'src/repositories/dynamo.product.repository';
import { S3Service } from 'src/infrastructure/aws/s3.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: DynamoProductRepository,
    private readonly s3Service: S3Service,
  ) {}

  async create(product: Product | any): Promise<Product | any> {
    const { image, ...rest } = product;

    const id = generateUniqueId();

    const imageUploaded = await this.s3Service.uploadFile(
      'marketplace-sls',
      `products/${id}${image?.originalname}`,
      Buffer.from(image?.buffer, 'base64'),
    );

    console.log(
      '🚀 ~ file: product.service.ts:24 ~ ProductService ~ create ~ imageUploaded:',
      imageUploaded,
    );

    // return imageUploaded;

    return this.productRepository.create({
      id,
      ...rest,
      image: imageUploaded?.key,
    });
  }

  async findAll() {
    return this.productRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
