import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Min, Max } from "class-validator";
import { Transform } from "class-transformer";
import { sanitizeInput } from "src/common/utils/sanitize.util";

export class CreateContactDto {
  @Transform(({ value }) => sanitizeInput(value))
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @Transform(({ value }) => sanitizeInput(value))
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeInput(value))
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  @Transform(({ value }) => sanitizeInput(value))
  subject: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  @Transform(({ value }) => sanitizeInput(value))
  message: string;
}