import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Avatar } from './entities/avatar.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { HttpRequestService } from '../http-request/http-request.service';
import { EmailService } from 'src/email/email.service';
import { CreateEmailDto } from './dto/create-email-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Avatar') private readonly avatarModel: Model<Avatar>,
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
      let avatar = await this.avatarModel.find({id: id});
      if(avatar.length > 0){
        return avatar[0].avatar;
      }else {
        const user = await this.httpRequest.getUserById(id);
        const newAvatar = {
          id: user.id,
          avatar: user.avatar,
        }
        console.log(user)
        const newUser = new this.avatarModel(newAvatar).save();
        
        return newUser;
      }

    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
        let avatar = await this.avatarModel.find({id: id});
        if(avatar.length > 0){
          const removed = await this.avatarModel.deleteOne({id: id});      
          return { messageResult: `The user: ${id} has been removed`};
        }else{
          throw new Error("Could not find the requested user");
        }
      
    } catch (error) {
      throw new Error("Could not remove the requested user");
    }  
  }
}
