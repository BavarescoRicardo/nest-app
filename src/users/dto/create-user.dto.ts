import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(5, { message: 'The user name should be longer than 5 letters' })
  email: string;
  @IsNotEmpty()
  first_name: string;
  @IsNotEmpty()
  last_name: string;
  avatar: string;
}
