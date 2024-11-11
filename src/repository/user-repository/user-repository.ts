import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {
    console.info('Create User Repository');
  }

  async _save(firstName: string, lastName?: string) {
    return await this.prismaService.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });
  }

  async _getAll() {
    return await this.prismaService.user.findMany();
  }

  async _getById(id: number) {
    return await this.prismaService.user.findUnique({
      where: { id: id },
    });
  }

  async _update(id: number, firstName: string, lastName?: string) {
    return await this.prismaService.user.update({
      where: { id },
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });
  }

  async _delete(id: number) {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
