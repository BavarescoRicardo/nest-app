import { IsNotEmpty } from "class-validator";

export class CreateEmailDto {
    @IsNotEmpty()
    email: String;
    @IsNotEmpty()
    message: String;
}
