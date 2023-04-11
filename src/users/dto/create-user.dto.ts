import { MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(5, { message: "The user name should be longer than 5 letters"})
    email: String;
    first_name: String;
    last_name: String;
    avatar: String;
}
