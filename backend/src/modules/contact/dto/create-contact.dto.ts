import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Transform } from "class-transformer";
import { sanitizeInput } from "src/common/utils/sanitize.util";

export class CreateContactDto {
  @Transform(({ value }) => sanitizeInput(value))
  @IsNotEmpty({ message: 'VALIDATION_NAME_TOO_SHORT' })
  @MinLength(2, { message: 'VALIDATION_NAME_TOO_SHORT' })
  name: string;

  @Transform(({ value }) => sanitizeInput(value))
  @IsEmail({}, { message: 'VALIDATION_EMAIL_INVALID' })
  email: string;

  @Transform(({ value }) => sanitizeInput(value))
  @IsNotEmpty({ message: 'VALIDATION_SUBJECT_TOO_SHORT' })
  @MinLength(3, { message: 'VALIDATION_SUBJECT_TOO_SHORT' })
  subject: string;

  @Transform(({ value }) => sanitizeInput(value))
  @IsNotEmpty({ message: 'VALIDATION_MESSAGE_TOO_SHORT' })
  @MinLength(10, { message: 'VALIDATION_MESSAGE_TOO_SHORT' })
  message: string;
}