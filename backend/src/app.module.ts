import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ContactModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),

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
})
export class AppModule {}

/**
 * 
 useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: false, // GMAIL CON 587 -> STARTTLS
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: configService.get<string>('MAIL_FROM'),
        },
      }),
    }),
 * 
 */
