import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { HttpRequestModule } from '../http-request/http-request.module';
import { Avatar } from './entities/avatar.entity';
import { EmailModule } from '../email/email.module';

describe('UsersService', () => {
  let service: UsersService;
  const user = {
    "email": "george.bluth@reqres.in",
    "first_name": "George",
    "last_name": "Bluth",
    "avatar": "https://reqres.in/img/faces/1-image.jpg"
  }

  const mockEmail = {}  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{
        name: 'User', schema: User,
      }]),
      MongooseModule.forFeature([{
        name: 'Avatar', schema: Avatar,
      }]),
      MongooseModule.forRoot('mongodb://localhost/apinest'), HttpRequestModule, EmailModule],
      providers: [UsersService],
    }).overrideProvider(EmailModule).useValue(mockEmail)
    .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get an user', async () =>{
    expect(await service.findOne(1)).toBeDefined;
  })

  it('should create and return an user', async () =>{
    expect(await service.create(user)).toBe({
      __v: 0,
      _id: expect.any(String),
      email: user.email,
      first_name: user.first_name,
      id: expect.any(Number),
      last_name: user.last_name,
      avatar: user.avatar
    });
  })
  
});
