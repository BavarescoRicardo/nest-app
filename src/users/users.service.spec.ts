import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { HttpRequestModule } from '../http-request/http-request.module';

describe('UsersService', () => {
  let service: UsersService;
  const user = {
    "id": 1,
    "email": "george.bluth@reqres.in",
    "first_name": "George",
    "last_name": "Bluth",
    "avatar": "https://reqres.in/img/faces/1-image.jpg"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{
        name: 'User', schema: User,
      }]),
      MongooseModule.forRoot('mongodb://localhost/apinest'), HttpRequestModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get an user', () =>{
    expect(service.findOne(1)).toBeCalled;
  })

  it('should get an user avatar', () =>{
    expect(service.findAvatar(1)).toBeDefined;
  })
});
