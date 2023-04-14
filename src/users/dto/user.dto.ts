import { IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    email: String;
    @IsNotEmpty()
    last_name: String;
    avatar: String;
}
