import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  HttpStatus,
  Body,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
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

  // cookie
  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() res: Response): void {
    res.cookie('name', name);
    res.status(HttpStatus.OK).send('Cookie set');
  }

  @Get('/get-cookie')
  getCookie(@Req() req: Request): string {
    return req.cookies.name;
  }

  // return views
  @Get('/view-hello')
  viewHello(@Query('name') name: string, @Res() res: Response): void {
    res.render('index.html', {
      title: 'Say Hello',
      name,
    });
  }
}
