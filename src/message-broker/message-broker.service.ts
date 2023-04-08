import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";

@Injectable()
export class MessageBrokerService {
    constructor(@Inject('M_SERVICE') private menssageService: ClientProxy){}

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
            this.menssageService.send(message, record).subscribe();
        } catch (error) {
            
        }
    }
}
