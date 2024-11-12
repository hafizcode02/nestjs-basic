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
  Inject,
  Put,
  ParseIntPipe,
  Delete,
  UseFilters,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Response } from 'express';
import { UserService } from './user.service';
import { Connection } from 'src/config/connection/connection';
import { UserMailService } from 'src/mailers/user-mail/user-mail.service';
import { UserRepository } from 'src/repository/user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ValidationFilter } from 'src/validation/validation.filter';
import { ValidationPipe } from 'src/validation/validation.pipe';
import {
  LoginUserRequest,
  LoginUserRequestValidation,
} from 'src/model/login.model';
import { TimeInterceptor } from 'src/time/time.interceptor';
import { Auth } from 'src/auth/auth.decorator';
import { User } from '@prisma/client';
import { RoleGuard } from 'src/role/role.guard';
import { Role } from 'src/role/role.decorator';

@Controller('/api/users')
export class UserController {
  constructor(
    private service: UserService,
    private connection: Connection,
    private mailService: UserMailService,
    private userRepository: UserRepository,
    @Inject('EmailService') private EmailService: UserMailService, // This is Alias Service (Provider)
    private memberService: MemberService,
  ) {}

  @Get('/')
  index(): string {
    this.mailService.send();
    this.EmailService.send();
    console.info(this.memberService._getConnectionName());
    console.info(this.memberService._sendEmail());
    return `This is Just API Playground + use connection ${this.connection.getName()}`;
  }

  // Sample Post with HTTP Response & return Json
  @Post('/create')
  create(
    @Res() res: Response,
    @Body('name') name: string,
    @Body('secret_message') secret_message: string,
  ): void {
    if (!name || !secret_message) {
      res.status(HttpStatus.BAD_REQUEST).send({
        error: 'name and secret_message are required',
      });
      return;
    }
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

  // Get Sample Route
  @Get('/sample')
  getSample(): string {
    return 'Get Sample Route';
  }

  // Get with Param
  @Get('/test/:id')
  getOne(@Param('id') id: string): string {
    return `GET /api/users/${id}`;
  }

  // Sample Get with Param but with async
  @Get('/hello/:name')
  async sayHello(@Param('name') name: string): Promise<string> {
    return `Hello ${name || 'World'}!`;
  }

  // Post with Param
  @Post('/say')
  saySomething(
    @Param('name') name: string,
    @Param('message') message: string,
  ): string {
    return `${name} says: ${message}`;
  }

  // set-cookie
  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() res: Response): void {
    res.cookie('name', name);
    res.status(HttpStatus.OK).send('Cookie set');
  }

  // get-cookie
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

  // Get Hello with return JSON
  @Get('hello-friends')
  async getHelloFriends(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Res() response: Response,
  ): Promise<void> {
    response.status(HttpStatus.OK).json({
      message: `Hello ${firstName} ${lastName}`,
    });
  }

  // Say WelcomeUser
  @Get('welcome-user')
  // @UseFilters(ValidationFilter)
  async welcomeUser(
    @Query('name') name: string,
    @Res() response: Response,
  ): Promise<void> {
    response.status(HttpStatus.OK).json({
      message: this.service.welcomeUser(name),
    });
  }

  // CRUD
  @Get('/crud')
  async getAll(@Res() response: Response): Promise<any> {
    await this.userRepository._getAll().then((data) => {
      response.status(HttpStatus.OK).json(data);
    });
  }

  @Post('/crud')
  async postUser(
    @Res() response: Response,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ): Promise<any> {
    await this.userRepository._save(firstName, lastName).then((data) => {
      response.status(HttpStatus.CREATED).json(data);
    });
  }

  @Get('/crud/:id')
  async getById(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    await this.userRepository._getById(id).then((data) => {
      response.status(HttpStatus.OK).json(data);
    });
  }

  @Put('/crud/:id')
  async updateUser(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
  ): Promise<any> {
    await this.userRepository._update(id, firstName, lastName).then((data) => {
      response.status(HttpStatus.OK).json(data);
    });
  }

  @Delete('/crud/:id')
  async deleteUser(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    await this.userRepository._delete(id).then((data) => {
      response.status(HttpStatus.OK).json(data);
    });
  }

  // Sample Custom Pipeline
  @UseFilters(ValidationFilter)
  @Post('/login-custom-pipeline')
  @UseInterceptors(TimeInterceptor)
  loginCustomPipeline(
    @Body(new ValidationPipe(LoginUserRequestValidation))
    req: LoginUserRequest,
    @Res() res: Response,
  ): void {
    res.status(HttpStatus.OK).json(req);
  }

  // Sample Custom Decorator
  @Get('/current')
  // @UseGuards(RoleGuard)
  @Role(['Admin', 'Operator'])
  current(@Auth() user: User): Record<string, any> {
    return {
      data: `Hello ${user.first_name}`,
    };
  }
}
