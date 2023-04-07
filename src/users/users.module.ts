import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
require('dotenv/config');

@Module({
  imports: [        
    MongooseModule.forFeature([{
      name: 'User', schema: User,
    }]),
    MongooseModule.forRoot('mongodb://localhost/apinest'),
    MailerModule.forRoot({
      transport: `smtps://${process.env.EMAIL}:${process.env.PASS}@smtp-relay.sendinblue.com` ,
      defaults: {
        from: `"nest-modules" <${process.env.FROM_EMAIL}>`,
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
