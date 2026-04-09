import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './modules/contact/contact.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


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
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

