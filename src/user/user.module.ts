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

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useClass:
        process.env.DATABASE == 'mysql'
          ? MySQLConnection
          : PostgreSQLConnection,
    },
    {
      provide: UserMailService,
      useValue: mailService,
    },
  ],
})
export class UserModule {}
