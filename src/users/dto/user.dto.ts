import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  last_name: string;
  avatar: string;
}
