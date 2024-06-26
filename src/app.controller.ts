import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import authJwt from './helper/authJwt';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  public constructor(private readonly appService: AppService, private readonly jwtService: JwtService) {}

  @Get('user')
  @HttpCode(HttpStatus.OK)
  public getUser(@Query('email') email) {
    return this.appService.selectUser(email);
  }

  @Post('user')
  @HttpCode(HttpStatus.CREATED)
  public createUser(@Body() body): object {
    return this.appService.createUser(body);
  }

  @Post('token')
  @HttpCode(HttpStatus.CREATED)
  public createToken(@Body() body): object {
    return this.appService.generateToken(body);
  }

  @Get('token')
  @HttpCode(HttpStatus.OK)
  public validateToken(@Query('token') token: string): any {
    if(!token){
      return {message: 'Token not found'};
    }

    return authJwt(this.jwtService, token, this.appService);
  }
}
