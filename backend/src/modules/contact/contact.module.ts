import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const user = configService.get<string>('MAIL_USER');
        const pass = configService.get<string>('MAIL_PASS');

        console.log('MAIL_USER:', user);
        console.log('MAIL_PASS:', pass ? 'OK' : 'UNDEFINED');

        return {
          transport: {
            host: configService.get<string>('MAIL_HOST'),
            port: Number(configService.get<number>('MAIL_PORT')),
            secure: false, // GMAIL CON 587 -> STARTTLS
            auth: {
              user,
              pass,
            },
          },
          defaults: {
            from: configService.get<string>('MAIL_FROM'),
          },
        };
      },
    }),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
