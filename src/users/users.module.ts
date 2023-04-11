import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { EmailModule } from '../email/email.module';
import { MessageBrokerModule } from '../message-broker/message-broker.module';
import { HttpRequestModule } from 'src/http-request/http-request.module';

@Module({
  imports: [      
    MongooseModule.forFeature([{
      name: 'User', schema: User,
    }]),
    MongooseModule.forRoot('mongodb://localhost/apinest'),
    EmailModule, MessageBrokerModule, HttpRequestModule
],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
