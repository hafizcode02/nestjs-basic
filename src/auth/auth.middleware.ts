import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// Auth Middleware Example by Name
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: any, res: any, next: () => void) {
    // Extract and sanitize the username
    let username: string = req.headers['x-username'] as string;

    // Check if username exists and is properly formatted
    if (!username) {
      throw new HttpException('Unauthorized: Missing username', 401);
    }

    // Trim and explicitly convert to a string to avoid unexpected issues
    username = String(username).trim();
    console.log(`Searching for user with username: "${username}"`);

    try {
      // Query the database with the sanitized username
      const user = await this.prismaService.user.findFirstOrThrow({
        where: {
          first_name: username, // Make sure this is the correct field
        },
      });

      console.log('User found:', user);
      req.user = user;
      next();
    } catch (error) {
      console.error('User not found or database error:', error);
      throw new HttpException('Unauthorized', 401);
    }
  }
}
