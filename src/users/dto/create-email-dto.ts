import { IsNotEmpty } from "class-validator";

export class CreateEmailDto {
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    message: string;
}
