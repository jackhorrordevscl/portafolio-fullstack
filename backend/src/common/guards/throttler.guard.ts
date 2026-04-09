import { ThrottlerGuard } from "@nestjs/throttler";
import { ExecutionContext, Injectable, HttpException, HttpStatus } from "@nestjs/common";

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
    protected async throwThrottlingException(
        context: ExecutionContext,
        ): Promise<void> {
        throw new HttpException(
            {
                statusCode: HttpStatus.TOO_MANY_REQUESTS,
                message: ['RATE_LIMIT_EXCEEDED'],
            },
            HttpStatus.TOO_MANY_REQUESTS,
        );
    }
}