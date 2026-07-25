import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateContactDto } from './dto/create-contact.dto';
import { Resend } from 'resend';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private resend: Resend;
  constructor(
    private readonly configService: ConfigService) {
      this.resend = new Resend(
        this.configService.get<string>('RESEND_API_KEY')
      );
    }

  async handleContact(dto: CreateContactDto) {
    const { name, email, subject, message, website } = dto;

    // Honeypot: los bots suelen completar cualquier campo de formulario.
    // Simulamos éxito sin enviar el email para no revelarles que fueron detectados.
    if (website) {
      this.logger.warn('Honeypot activado, mensaje descartado silenciosamente');
      return { message: 'CONTACT_SUCCESS' };
    }

    const to = this.configService.get<string>('MAIL_TO');
    if (!to) {
      throw new Error('MAIL_TO is not defined');
    }
    try{
      const from = this.configService.get<string>('MAIL_FROM') ?? 'Ground Zero Devs <contacto@groundzerodevs.com>';

      await this.resend.emails.send({
        from,
        to,
        subject: `[Ground Zero Devs] Nuevo contacto: ${subject}`,
        replyTo: email,
        text: `
          Nombre: ${name}
          Email: ${email}
          Mensaje:
          ${message}
        `,
      });

    return { message: 'CONTACT_SUCCESS' };
    } catch (error) {
      this.logger.error('Fallo al enviar email via Resend', error instanceof Error ? error.stack : error);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ['EMAIL_SEND_FAILED'],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

