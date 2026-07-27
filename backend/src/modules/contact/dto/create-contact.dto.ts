import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Transform } from "class-transformer";
import { sanitizeInput } from "src/common/utils/sanitize.util";

// Estas reglas (min/maxLength por campo) están duplicadas a mano en
// frontend/src/services/contactService.ts (validateContactForm) — si cambian
// acá, actualizar también ahí.
export class CreateContactDto {
  @Transform(({ value }) => sanitizeInput(value))
  @IsNotEmpty({ message: 'VALIDATION_NAME_TOO_SHORT' })
  @MinLength(2, { message: 'VALIDATION_NAME_TOO_SHORT' })
  @MaxLength(100, { message: 'VALIDATION_NAME_TOO_LONG' })
  name: string;

  @Transform(({ value }) => sanitizeInput(value))
  @IsEmail({}, { message: 'VALIDATION_EMAIL_INVALID' })
  @MaxLength(150, { message: 'VALIDATION_EMAIL_INVALID' })
  email: string;

  @Transform(({ value }) => sanitizeInput(value))
  @IsNotEmpty({ message: 'VALIDATION_SUBJECT_TOO_SHORT' })
  @MinLength(3, { message: 'VALIDATION_SUBJECT_TOO_SHORT' })
  @MaxLength(150, { message: 'VALIDATION_SUBJECT_TOO_LONG' })
  subject: string;

  @Transform(({ value }) => sanitizeInput(value))
  @IsNotEmpty({ message: 'VALIDATION_MESSAGE_TOO_SHORT' })
  @MinLength(10, { message: 'VALIDATION_MESSAGE_TOO_SHORT' })
  @MaxLength(2000, { message: 'VALIDATION_MESSAGE_TOO_LONG' })
  message: string;

  // Honeypot: campo invisible para humanos. Si llega con contenido, es un bot.
  @IsOptional()
  @IsString()
  website?: string;
}