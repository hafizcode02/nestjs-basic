import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('/api/users')
export class UserController {
  // Sample Post with HTTP Response & return Json
  @Post('/create')
  create(
    @Res() res: Response,
    @Body('name') name: string,
    @Body('secret_message') secret_message: string,
  ): void {
    res.status(HttpStatus.CREATED).send({
      name,
      secret_message,
      status: 'created',
    });
  }

  // Redirect
  @Get('/redirect')
  redirect(@Res() res: Response): void {
    res.redirect('/api/users/sample');
  }

  @Post()
  post(): string {
    return 'POST /api/users';
  }

  @Get('/sample')
  getSample(): string {
    return 'Get Sample Route';
  }

  @Get('/test/:id')
  getOne(@Param('id') id: string): string {
    return `GET /api/users/${id}`;
  }

  // Sample Get with Param but with async
  @Get('/hello/:name')
  async sayHello(@Param('name') name: string): Promise<string> {
    return `Hello ${name || 'World'}!`;
  }

  @Post('/say')
  saySomething(
    @Param('name') name: string,
    @Param('message') message: string,
  ): string {
    return `${name} says: ${message}`;
  }
}
