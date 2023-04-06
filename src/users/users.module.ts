import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [        
    MongooseModule.forFeature([{
      name: 'User', schema: User,
    }]),
    MongooseModule.forRoot('mongodb://localhost/apinest'),
    MailerModule.forRoot({
      transport: 'smtps://ricardo.bav17@gmail.com:dgFaV0p27Oy1wDIB@smtp-relay.sendinblue.com',
      defaults: {
        from: '"nest-modules" <nest.ricardo.task@gmail.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
