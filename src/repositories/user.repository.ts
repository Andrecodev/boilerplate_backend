import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { UserDto } from '../modules/auth/dto/user.dto';
import { generateUniqueId } from 'src/common/utils/tools.utils';

@Injectable()
export class UserRepository {
  private readonly dynamoDB: AWS.DynamoDB.DocumentClient;
  private readonly tableName: string;

  constructor() {
    this.dynamoDB = new AWS.DynamoDB.DocumentClient();
    this.tableName = 'UsersTable';
  }

  async findOneByEmail(email: string): Promise<any> {
    const params = {
      TableName: this.tableName,
      IndexName: 'emailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    const result = await this.dynamoDB.query(params).promise();

    if (result.Items && result.Items.length > 0) {
      return result.Items[0];
    }

    return null;
  }

  async create(user: UserDto): Promise<any> {
    try {
      const id = generateUniqueId();

      const params = {
        TableName: this.tableName,
        Item: {
          id,
          name: user.name,
          email: user.email,
          password: user.password,
        },
      };

      return await this.dynamoDB.put(params).promise();
    } catch (error) {
      console.log('🚀 ~ ERROR ~ UserRepository:', error);
    }
  }
}
