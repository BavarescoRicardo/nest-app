import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
require('dotenv/config');

@Module({
  imports: [
    MailerModule.forRoot({
      transport: `smtps://${process.env.EMAIL_HOST}:${process.env.EMAIL_PASS}@smtp-relay.sendinblue.com`,
      defaults: {
        from: `"nest-modules" <${process.env.FROM_EMAIL}>`
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true
        }
      }
    })
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
