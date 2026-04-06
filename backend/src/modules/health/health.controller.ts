import { Controller, Get } from '@nestjs/common';
import { timestamp } from 'rxjs';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
        status: 'ok',
        timestamp: new Date().toISOString(),
    };
  }
}