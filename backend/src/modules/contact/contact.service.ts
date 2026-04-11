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
      await this.resend.emails.send({
      from: 'onboarding@resend.dev',
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
/*
        try {
            await this.mailerService.sendMail({
                to,
                subject: `[PORTAFOLIO] ${subject}`,
                replyTo: email,
                text: `
                    Nombre: ${name}
                    Email: ${email}

                    Mensaje:
                    ${message}
                `,
                    html: `
                        <h2>Nuevo mensaje desde el portafolio</h2>
                        <p><strong>Nombre:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Mensaje:</strong></p>
                        <p>${message}</p>
                    `,
            });
            return { message: "CONTACT_SUCCESS" };
        } catch (error) {
            //NO FILTRAR AQUI, DEJA AL INTERCEPTOR GLOBAL ACTUAR.
            throw new HttpException(
                {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: ['EMAIL_SEND_FAILED'],
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        
    }
} */
