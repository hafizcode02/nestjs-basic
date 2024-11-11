import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection } from 'src/config/connection/connection';
import { UserMailService } from 'src/mailers/user-mail/user-mail.service';

@Injectable()
export class MemberService {
  constructor(private moduleRef: ModuleRef) {}

  _getConnectionName(): string {
    const connection = this.moduleRef.get(Connection);
    return connection.getName();
  }

  _sendEmail() {
    const mailService = this.moduleRef.get(UserMailService);
    mailService.send();
  }
}
