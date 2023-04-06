import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';

@Module({
  imports: [        
    MongooseModule.forFeature([{
      name: 'User', schema: User,
    }]),
    MongooseModule.forRoot('mongodb://localhost/apinest')
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
