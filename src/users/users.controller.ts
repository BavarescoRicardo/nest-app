import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessageBrokerService } from '../message-broker/message-broker.service';
require('dotenv/config');

@Controller('api/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,    
    private readonly messageBrokerService: MessageBrokerService
  ) {}

  @Post()
  async create(@Body(new ValidationPipe) createUserDto: CreateUserDto) {
    await this.messageBrokerService.sendMessage(createUserDto.email);
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {      
      return this.usersService.findOne(+id);
    } catch (error) {
      throw new Error("Could not use message broker, find user");
    }
  }

  @Delete(':id/avatar')
  async remove(@Param('id') id: string) {
    try {
      return await this.usersService.remove(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Get(':id/avatar')
  async findAvatar(@Param('id') id: string) {
    try {
      return await this.usersService.findAvatar(+id);
    } catch (error) {
      throw new Error("Could not use message broker, find user");
    }
  }

  @Get()
  async findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new Error("Could not use message broker, find user");
    }
  }
}
