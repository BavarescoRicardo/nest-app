import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>,
    @Inject('SUBSCRIBERS_SERVICE') private menssageService: ClientProxy) {}
  
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = {
        ...createUserDto,
        id: Date.now()
      }

      const result: UserDto = await new this.userModel(newUser).save();
      return result;

    } catch (error) {
      throw error;
    }

  }

  async findAll() {    
    try {
      const result:UserDto[] = await this.userModel.find();
      return result;
      
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
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


      const result: UserDto = await this.userModel.findOne({ id: id});
      return result;
      
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) : Promise<UpdateUserDto>{
    try {
      const user = await this.userModel.findOne({ id: id});
      await new this.userModel(user).updateOne(updateUserDto);
      return updateUserDto;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const removed = await this.userModel.deleteOne({id: id})
      .then(() => {
        return { messageResult: `The user: ${removed} has been removed`};
    })   
      
    } catch (error) {
      throw error;
    }  
  }
}
