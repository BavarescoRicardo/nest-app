import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateEmailDto } from './dto/create-email-dto';
import { PermissionGuard } from 'src/permission/permission.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('enviar-email')
  enviarEmail(@Body() req: CreateEmailDto) {
    return this.usersService.enviarEmail(req);
  }
}
