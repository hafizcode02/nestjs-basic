import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Connection, createConnection } from 'src/config/connection/connection';
import {
  mailService,
  UserMailService,
} from 'src/mailers/user-mail/user-mail.service';
import { UserRepository } from 'src/repository/user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      // This is Class Provider
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },
    {
      // This is Value Provider
      provide: UserMailService,
      useValue: mailService,
    },
    {
      // This is Alias Service
      provide: 'EmailService',
      useExisting: UserMailService,
    },
    UserRepository,
    MemberService,
    PrismaService,
  ],
  exports: [UserService], // Shared Module for App Controller, without it will be error
})
export class UserModule {}
