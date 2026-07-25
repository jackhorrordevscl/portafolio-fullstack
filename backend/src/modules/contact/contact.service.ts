import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateContactDto } from './dto/create-contact.dto';
import { Resend } from 'resend';

@Injectable()
export class ContactService {
  private resend: Resend;
  constructor(
    private readonly configService: ConfigService) {
      this.resend = new Resend(
        this.configService.get<string>('RESEND_API_KEY')
      );
    }

  async handleContact(dto: CreateContactDto) {
    const { name, email, subject, message } = dto;
    const to = this.configService.get<string>('MAIL_TO');
    if (!to) {
      throw new Error('MAIL_TO is not defined');
    }
    try{
      const from = this.configService.get<string>('MAIL_FROM') ?? 'Ground Zero Devs <contacto@groundzerodevs.com>';

      await this.resend.emails.send({
        from,
        to,
        subject: `[PORTAFOLIO] ${subject}`,
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
      console.error('RESEND_ERROR', error);
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

