import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
