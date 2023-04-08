import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MessageBrokerModule } from './message-broker/message-broker.module';

@Module({
  imports: [UsersModule, MessageBrokerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
