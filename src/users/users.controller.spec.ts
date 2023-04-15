import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailModule } from '../email/email.module';
import { MessageBrokerModule } from '../message-broker/message-broker.module';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const mockUserService = {};
    const module: TestingModule = await Test.createTestingModule({
      imports: [EmailModule, MessageBrokerModule],
      controllers: [UsersController],
      providers: [UsersService]
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
