import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from '../email/email.service';

@Module({
  imports: [      
    MongooseModule.forFeature([{
      name: 'User', schema: User,
    }]),
    MongooseModule.forRoot('mongodb://localhost/apinest'),
    EmailModule
],
  controllers: [UsersController],
  providers: [UsersService, EmailService]
})
export class UsersModule {}
