import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, RmqRecordBuilder, Transport } from "@nestjs/microservices";
import { catchError, of } from 'rxjs';

@Injectable()
export class MessageBrokerService {
  private USER="admin"
  private PASS="StrongPassword"
  private HOST="localhost:5672/tasks"
  private QUEUENAME="tasks"
  private client: ClientProxy;

    constructor(){
    this.client = 
    ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${"admin"}:${"StrongPassword"}@${"localhost:5672/tasks"}`],
        queue: "tasks",
        queueOptions: {
          durable: true,
        }
      }
    })
    }

    async sendMessage(id: number) {
        try {
            const message = "Foi criado o usuario: "+id;
            const record = new RmqRecordBuilder(message)
              .setOptions({
                headers: {
                  ['x-version']: '1.0.0',
                },
                priority: 3,
              })
              .build();
            this.client.send(message, record).pipe(catchError( error => of({
              error: error              
            })));
        } catch (error) {
            
        }
    }
}
