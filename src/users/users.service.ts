import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { HttpRequestService } from '../http-request/http-request.service';
import { EmailService } from 'src/email/email.service';
import { CreateEmailDto } from './dto/create-email-dto';
import { stringify } from 'querystring';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>,
  private readonly httpRequest: HttpRequestService,
  private readonly emailService: EmailService,
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = {
        ...createUserDto,
        id: Date.now()
      }
      
      const email: CreateEmailDto = {email: 'ricardo.bav17@gmail.com', message: 'user: '+ createUserDto.email + ' created.'};
      this.emailService.sendEmail(email);
      const result: UserDto = await new this.userModel(newUser).save();
      return result;

    } catch (error) {
      throw error;
    }

  }

  async findOne(id: number) {
    try {

      const result = await this.httpRequest.getUserById(id);
      return result;
      
    } catch (error) {
      throw error;
    }
  }

  async findAvatar(id: number) {
     try {
      let user = await this.userModel.find({id: id});
      if(user.length > 0){
        return user;
      }else {
        user = await this.httpRequest.getUserById(id);
        const newUser = new this.userModel(user).save();
        // const newUser = JSON.parse(user);
        return newUser;
      }
      return user;

    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      console.log("Tryn to remover id. "+id)
      const removed = await this.userModel.deleteOne({id: id})
      .then(() => {
        return { messageResult: `The user: ${id} has been removed`};
    })   
      
    } catch (error) {
      throw new Error("Could not remove the requested user");
    }  
  }
}
