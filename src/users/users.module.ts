import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from '../email/email.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [      
    MongooseModule.forFeature([{
      name: 'User', schema: User,
    }]),
    MongooseModule.forRoot('mongodb://localhost/apinest'),
    EmailModule
],
  controllers: [UsersController],
  providers: [UsersService, EmailService,
    {
      provide: 'SUBSCRIBERS_SERVICE',
      useFactory: () => {   
        const USER="admin"
        const PASS="StrongPassword"
        const HOST="localhost:5672/tasks"
        const QUEUENAME="tasks"
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${USER}:${PASS}@${HOST}`],
            queue: QUEUENAME,
            queueOptions: {
              durable: true,
            }
          }
        })
      }
    }]
})
export class UsersModule {}
