import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { EmailModule } from 'src/email/email.module';
import { MessageBrokerModule } from 'src/message-broker/message-broker.module';

@Module({
  imports: [      
    MongooseModule.forFeature([{
      name: 'User', schema: User,
    }]),
    MongooseModule.forRoot('mongodb://localhost/apinest'),
    EmailModule, MessageBrokerModule
],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
