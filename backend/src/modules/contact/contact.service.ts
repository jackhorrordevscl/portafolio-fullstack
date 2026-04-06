import { Injectable } from "@nestjs/common";
import { CreateContactDto } from "./dto/create-contact.dto";

@Injectable()
export class ContactService {
    async handleContact(dto: CreateContactDto) {
        //MOCK TEMPORAL
        console.log('📩 Nuevo Mensaje de Contacto:', dto);

        return {
            success: true,
            message: 'Mensaje recibido correctamente',
        };
    }
}