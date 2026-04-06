import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Min, Max } from "class-validator";

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
    @MinLength(3)
    @MaxLength(150)
    subject: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(1000)
    message: string;
}