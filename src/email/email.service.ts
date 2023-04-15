import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from 'src/users/dto/create-email-dto';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(req: string) {
    const email: CreateEmailDto = {
      email: req,
      message: 'user: ' + req + ' created.'
    };

    await this.mailerService.sendMail({
      to: email.email.toString(),
      from: 'ricardo.bav17@gmail.com',
      subject: 'Sending Email with NestJS',
      html: `<h3>${email.message}</h3>`
    });
  }
}
