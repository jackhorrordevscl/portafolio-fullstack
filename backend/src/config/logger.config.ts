import { WinstonModule } from "nest-winston";
import * as winston from 'winston'

export const createWinstonConfig = () => 
    WinstonModule.forRoot({
        level: process.env.LOG_LEVEL ?? 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json(),
        ),
        transports: [new winston.transports.Console()],
    });