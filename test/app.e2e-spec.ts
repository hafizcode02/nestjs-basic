import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api/users/hello-friends (GET)', async () => {
    const result = await request(app.getHttpServer())
      .get('/api/users/hello-friends')
      .query({
        firstName: 'Hafiz',
        lastName: 'Caniago',
      });

    expect(result.status).toBe(HttpStatus.OK);
    expect(result.body).toEqual({
      message: 'Hello Hafiz Caniago',
    });
  });
});
