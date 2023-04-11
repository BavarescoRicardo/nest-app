import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, RmqRecordBuilder, Transport } from "@nestjs/microservices";
import { catchError, map } from 'rxjs';
require('dotenv/config');

@Injectable()
export class MessageBrokerService {
  private QUEUENAME="tasks"
  private client: ClientProxy;

    constructor(){
    this.client = 
    ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PASS}@${process.env.RABBIT_HOST}`],
        queue: this.QUEUENAME,
        queueOptions: {
          durable: true,
        }
      }
    })
    }

    async sendMessage(name: String) {
        try {
            const message = "Foi criado o usuario: "+ name;
            const record = new RmqRecordBuilder(message)
              .setOptions({
                headers: {
                  ['x-version']: '1.0.0',
                },
                priority: 3,
              })
              .build();

              this.client.send(record, message)
              .subscribe({
                next: (v) => console.log(v),
                error: (e) => console.error(e),
                complete: () => console.info('complete') 
            })
        } catch (error) {
          throw new Error("Failed to send message");
        }
    }
}
