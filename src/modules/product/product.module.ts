import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DynamoProductRepository } from 'src/repositories/dynamo.product.repository';
import { S3Service } from 'src/infrastructure/aws/s3.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, DynamoProductRepository, S3Service],
})
export class ProductModule {}
