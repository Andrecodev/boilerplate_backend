import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UnauthorizedException,
  UsePipes,
  HttpStatus,
  HttpException,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';

import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async signIn(
    @Body() credentials: { email: string; password: string },
  ): Promise<{ access_token: string }> {
    const userValidated = await this.authService.validateUser(
      credentials.email,
      credentials.password,
    );

    if (userValidated.statusCode !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    const access_token = await this.authService.login(credentials.email);
    return { access_token };
  }

  @UseGuards(AuthGuard)
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() userDto: UserDto): Promise<any> {
    const result = await this.authService.signUp(userDto);

    if (result.statusCode !== HttpStatus.CREATED) {
      throw new HttpException(result.message, result.statusCode);
    }

    return { message: result.message };
  }
}
