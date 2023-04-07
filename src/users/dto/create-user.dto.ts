import { MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(5, { message: "The user name should be longer than 5 letters"})
    name: String;
    last_name: String;
    hash: String;
    avatar: String;
}
