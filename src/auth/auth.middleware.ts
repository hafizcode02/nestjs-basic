import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// Auth Middleware Example by Name
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    let username: string = req.headers['x-username'] as string;
    if (!username) {
      throw new HttpException('Unauthorized', 401);
    }

    console.log('username = ', username); // weird, udah "Hafiz". tapi kalo pake ini gajadi
    username = 'Hafiz'; // tapi kalo di redefine ulang malah jadi
    const user = await this.prismaService.user.findFirstOrThrow({
      where: {
        first_name: username,
      },
    });

    if (!user) {
      throw new HttpException('Unauthorized', 401);
    }

    req.user = user;
    next();
  }
}
