import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmailDto } from './dto/create-email-dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>,
    private mailerService: MailerService) {}
  
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = {
        ...createUserDto,
        id: Date.now()
      }

      const result = await new this.userModel(newUser).save();
      return result;

    } catch (error) {
      throw error;
    }

  }

  async findAll() {    
    try {
      return await this.userModel.find();
      
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.userModel.findOne({ id: id});
      
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findOne({ id: id});
      return await new this.userModel(user).updateOne(updateUserDto);      
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const removed = await this.userModel.deleteOne({id: id})
      .then(() => {
        return `The user: ${removed} has been removed`;
    })   
      
    } catch (error) {
      throw error;
    }  
  }

  async enviarEmail(req: CreateEmailDto) {
    await this.mailerService.sendMail({
      to: req.email,
      from: 'ricardo.bav17@gmail.com',
      subject: 'Sending Email with NestJS',
      html: `<h3 style="color: red">${req.message}</h3>`,
    });
  }

}
