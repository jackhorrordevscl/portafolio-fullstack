import { Body, Controller, Post } from '@nestjs/common'
import { ContactService } from './contact.service'
import { CreateContactDto } from './dto/create-contact.dto'

@Controller('contact')
export class ContactController {
    constructor(private readonly contacService: ContactService) {}

    @Post()
    sendMessage(@Body() dto: CreateContactDto) {
        return this.contacService.handleContact(dto);
    }
}