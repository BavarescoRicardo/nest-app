import { IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(5, { message: "The user name should be longer than 5 letters"})
    email: String;
    @IsNotEmpty()
    first_name: String;
    @IsNotEmpty()
    last_name: String;
    avatar: String;
}
