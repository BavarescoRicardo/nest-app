import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from 'src/users/dto/create-email-dto';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) {}
  

    async sendEmail(req: CreateEmailDto) {

      await this.mailerService.sendMail({
        to: req.email,
        from: 'ricardo.bav17@gmail.com',
        subject: 'Sending Email with NestJS',
        html: `<h3>${req.message}</h3>`,
      });
    }
}
