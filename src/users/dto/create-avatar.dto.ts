import { IsNotEmpty } from 'class-validator';

export class CreateAvatarDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  avatar: string;
}
