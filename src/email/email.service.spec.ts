import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const mockEmail = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService],
      exports: [EmailService]
    })
      .overrideProvider(EmailService)
      .useValue(mockEmail)
      .compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
