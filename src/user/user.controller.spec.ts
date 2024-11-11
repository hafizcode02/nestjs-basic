import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return expected string', () => {
    expect(controller.getSample()).toBe('Get Sample Route');
  });

  it('should can get view', () => {
    const response = httpMock.createResponse();
    controller.viewHello('Hafiz', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      title: 'Say Hello',
      name: 'Hafiz',
    });
  });
});
