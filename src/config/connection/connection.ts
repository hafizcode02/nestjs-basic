// Class Provider
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class Connection {
  getName(): string {
    return '';
  }
}

@Injectable()
export class MySQLConnection extends Connection {
  getName(): string {
    return 'MySQL Connection';
  }
}

@Injectable()
export class PostgreSQLConnection extends Connection {
  getName(): string {
    return 'PostgreSQL Connection';
  }
}

export function createConnection(configService: ConfigService): Connection {
  return configService.get('DATABASE') === 'mysql'
    ? new MySQLConnection()
    : new PostgreSQLConnection();
}
