import { 
    ThrottlerGuard,
    //type ThrottlerModuleOptions,
    //type ThrottlerStorage 
    } from "@nestjs/throttler";
import { 
    ExecutionContext, 
    Logger, 
    Injectable, 
    HttpException, 
    HttpStatus } from "@nestjs/common";
//import { Reflector} from '@nestjs/core'
//import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
//import type { Logger } from 'winston';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  private readonly logger = new Logger(CustomThrottlerGuard.name);
    
    protected async throwThrottlingException(
        context: ExecutionContext,
        ): Promise<void> {
            const request = context.switchToHttp().getRequest();

            const ip = request.ip;
            const path = request.url;

            this.logger.warn(
                `Rate limit exceeded | IP: ${ip} | Path: ${path}`,
            );
            
        throw new HttpException(
            {
                statusCode: HttpStatus.TOO_MANY_REQUESTS,
                message: ['RATE_LIMIT_EXCEEDED'],
            },
            HttpStatus.TOO_MANY_REQUESTS,
        );
    }
}