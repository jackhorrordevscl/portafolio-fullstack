import { Module } from "@nestjs/common";  
import { HealthModule } from './modules/health/health.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [HealthModule, ContactModule],
  controllers: [],
  providers: [],
})
export class AppModule {}