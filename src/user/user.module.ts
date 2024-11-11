import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  Connection,
  MySQLConnection,
  PostgreSQLConnection,
} from 'src/config/connection/connection';
import {
  mailService,
  UserMailService,
} from 'src/mailers/user-mail/user-mail.service';
import {
  createUserRepository,
  UserRepository,
} from 'src/repository/user-repository/user-repository';
import { MemberService } from './member/member.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      // This is Class Provider
      provide: Connection,
      useClass:
        process.env.DATABASE == 'mysql'
          ? MySQLConnection
          : PostgreSQLConnection,
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
    {
      // This is Factory Provider
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection],
    },
    MemberService,
  ],
})
export class UserModule {}
