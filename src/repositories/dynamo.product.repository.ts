// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { ProductRepository } from 'src/abstract/repositories/product.repository.abstract';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class DynamoProductRepository implements ProductRepository {
  private readonly TABLE_NAME = 'ProductsTable';
  private readonly documentClient: DocumentClient;

  constructor() {
    this.documentClient = new DocumentClient();
  }

  async create(product: Product): Promise<any> {
    return await this.documentClient
      .put({ TableName: this.TABLE_NAME, Item: product })
      .promise();
  }

  async findById(id: string): Promise<Product | null> {
    const result = await this.documentClient
      .get({ TableName: this.TABLE_NAME, Key: { id } })
      .promise();
    return result.Item as Product | null;
  }

  async findAll(): Promise<Product[]> {
    const result = await this.documentClient
      .scan({ TableName: this.TABLE_NAME })
      .promise();
    console.log(
      '🚀 ~ file: dynamo.product.repository.ts:34 ~ DynamoProductRepository ~ findAll ~ result:',
      result,
    );
    return result.Items as Product[];
  }

  async deleteById(id: string): Promise<void> {
    await this.documentClient
      .delete({ TableName: this.TABLE_NAME, Key: { id } })
      .promise();
  }

  async updateById(
    id: string,
    data: Partial<Product>,
  ): Promise<Product | null> {
    const result = await this.documentClient
      .update({
        TableName: this.TABLE_NAME,
        Key: { id },
        UpdateExpression:
          'set #name = :name, #description = :description, #price = :price',
        ExpressionAttributeNames: {
          '#name': 'name',
          '#description': 'description',
          '#price': 'price',
        },
        ExpressionAttributeValues: {
          ':name': data.name,
          ':description': data.description,
          ':price': data.price,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();
    return result.Attributes as Product | null;
  }

  async createNew() {
    return 'yee';
  }
}
