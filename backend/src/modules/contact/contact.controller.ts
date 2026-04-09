import { Body, Controller, Post } from '@nestjs/common'
import { ContactService } from './contact.service'
import { CreateContactDto } from './dto/create-contact.dto'
import { Throttle } from '@nestjs/throttler';

@Controller('contact')
export class ContactController {
    constructor(private readonly contacService: ContactService) {}

    @Post()
    @Throttle({ default: { limit: 5, ttl: 60 } })
    sendMessage(@Body() dto: CreateContactDto) {
        return this.contacService.handleContact(dto);
    }
}