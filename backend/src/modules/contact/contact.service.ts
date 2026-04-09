import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { CreateContactDto } from "./dto/create-contact.dto";

@Injectable()
export class ContactService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) {}

    async handleContact(dto: CreateContactDto) {
        const { name, email, subject, message } = dto;
        const to = this.configService.get<string>('MAIL_TO');

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
            throw new InternalServerErrorException({
                message: "CONTACT_ERROR",
            })
        }
        
    }
}