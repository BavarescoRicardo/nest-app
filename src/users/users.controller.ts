import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PermissionGuard } from '../permission/permission.guard';
import { EmailService } from '../email/email.service';
import { MessageBrokerService } from '../message-broker/message-broker.service';
require('dotenv/config');

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly messageBrokerService: MessageBrokerService
  ) {}

  @Post()
  @UseGuards(PermissionGuard)
  create(@Body(new ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      await this.messageBrokerService.sendMessage(+id);
      return this.usersService.findOne(+id);
    } catch (error) {
      throw new Error("Could not use message broker, find user");
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result: UpdateUserDto = await this.usersService.update(+id, updateUserDto);

      const req = {
        email: "ricardo.bav17@gmail.com",
        message: "atualizado usuario: " + result.name + " --  envio sucedido "
      }      
      
      this.emailService.enviarEmail(req);
      
      return result;
    } catch (error) {
      return NotFoundException;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Get(':id/avatar')
  async findAvatar(@Param('id') id: string) {
    try {
      return this.usersService.findAvatar(+id);
    } catch (error) {
      throw new Error("Could not use message broker, find user");
    }
  }
}
