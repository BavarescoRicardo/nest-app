import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MessageBrokerService } from './message-broker.service';
/*
const providerFactory = 
{
  provide: 'M_SERVICE',
  useFactory: () => {   
    const USER="admin"
    const PASS="StrongPassword"
    const HOST="localhost:5672/tasks"
    const QUEUENAME="tasks"
    return 
    ClientProxyFactory.create({
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
}
*/
@Module({
  providers: [ MessageBrokerService],
  exports: [MessageBrokerService]
})

export class MessageBrokerModule {}
