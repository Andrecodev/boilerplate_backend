import { Injectable, HttpStatus } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import { UserRepository } from '../../repositories/user.repository';
import { decrypt } from 'src/common/utils/decryption';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ message: string; statusCode: number; access_token?: string }> {
    // const user = await this.userRepository.findOneByEmail(email);

    // if (!user) {
    //   return {
    //     message: 'Email or password incorrect',
    //     statusCode: HttpStatus.BAD_REQUEST,
    //   };
    // }

    // const isValidPassword = await decrypt(password, user.password);

    // if (!isValidPassword) {
    //   return {
    //     message: 'Email or password incorrect.',
    //     statusCode: HttpStatus.BAD_REQUEST,
    //   };
    // }

    return {
      message: 'User validated',
      statusCode: HttpStatus.OK,
    };
  }

  async login(email: string): Promise<string> {
    const payload = { email };
    const response = await this.jwtService.signAsync(payload);

    return response;
  }

  async signUp(userDto: UserDto): Promise<any> {
    try {
      const userExists = await this.userRepository.findOneByEmail(
        userDto.email,
      );
      console.log(
        '🚀 ~ file: auth.service.ts:74 ~ AuthService ~ signUp ~ userExists:',
        userExists,
      );

      if (userExists) {
        return {
          message: 'User already exists',
          statusCode: HttpStatus.CONFLICT,
        };
      }

      await this.userRepository.create(userDto);

      return {
        message: 'User created successfully',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log('🚀 ~ ERROR ~ AuthService:', error);
      return {
        message: 'Failed to create user',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
