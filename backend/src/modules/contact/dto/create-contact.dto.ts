import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(1000)
    message: string;
}