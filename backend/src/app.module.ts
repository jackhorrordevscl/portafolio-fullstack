import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './modules/contact/contact.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ContactModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 20,
      }
    ])
  ],
})
export class AppModule {}

