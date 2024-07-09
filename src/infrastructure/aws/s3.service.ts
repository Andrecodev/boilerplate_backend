import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      // Your S3 configuration options go here
    });
  }

  async uploadFile(
    bucketName: string,
    key: string,
    body: Buffer,
  ): Promise<any> {
    try {
      return await this.s3
        .upload({
          Bucket: bucketName,
          Key: key,
          Body: body,
        })
        .promise();

      //   return {
      //     statusCode: 200,
      //     body: JSON.stringify({
      //       message: 'Image uploaded successfully',
      //       data,
      //     }),
      //   };
    } catch (error) {
      console.error(error);
      // return {
      //   statusCode: 500,
      //   body: JSON.stringify({
      //     message: 'Failed to upload image',
      //   }),
      // };
    }
  }

  async getFile(bucketName: string, key: string): Promise<Buffer> {
    const { Body } = await this.s3
      .getObject({
        Bucket: bucketName,
        Key: key,
      })
      .promise();
    return Body as Buffer;
  }
}
