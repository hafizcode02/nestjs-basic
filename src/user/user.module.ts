import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  Connection,
  MySQLConnection,
  PostgreSQLConnection,
} from 'src/config/connection/connection';

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
  ],
})
export class UserModule {}
