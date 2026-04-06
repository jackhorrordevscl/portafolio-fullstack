import { Injectable } from "@nestjs/common";
import { CreateContactDto } from "./dto/create-contact.dto";

@Injectable()
export class ContactService {
    async handleContact(dto: CreateContactDto) {
        
        console.log('📩 Nuevo Mensaje de Contacto:', {
            name: dto.name,
            email: dto.email,
            subject: dto.subject,
            message: dto.message,
            messageLength: dto.message.length,
        });

        return {
            success: true,
            message: 'Mensaje recibido correctamente',
        };
    }
}