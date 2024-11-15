import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
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

  it('should can create some data', () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    controller.create(mockResponse, 'Hafiz', 'Rahasia');
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(mockResponse.send).toHaveBeenCalledWith({
      name: 'Hafiz',
      secret_message: 'Rahasia',
      status: 'created',
    });
  });

  it('should return welcome Hafiz!', async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await controller.welcomeUser('Hafiz', mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Welcome Hafiz!',
    });
  });
});
