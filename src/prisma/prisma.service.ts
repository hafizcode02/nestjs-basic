import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    console.info('PrismaService constructor');
  }
  onModuleInit() {
    console.info('PrismaService onModuleInit: Connect Prisma');
    this.$connect();
  }
  onModuleDestroy() {
    console.info('PrismaService onModuleDestroy : Disconnect Prisma');
    this.$disconnect();
  }
}
