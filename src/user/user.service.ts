import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  welcomeUser(name: string): string {
    return `Welcome ${name || 'User'}!`;
  }
}
