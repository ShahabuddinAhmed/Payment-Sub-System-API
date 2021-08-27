import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(private readonly loggerService: LoggerService) {}

	catch(exception: Record<string, unknown>, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		const { statusCode, message, error } : any = exception instanceof HttpException ? exception.getResponse() :
			{ message: exception.message, error: exception.message, statusCode: HttpStatus.INTERNAL_SERVER_ERROR };
		
		if (statusCode === 500 || Array.isArray(message)) {
			this.loggerService.error(JSON.stringify(message), error);
		}

		response.status(statusCode).json({
			statusCode,
			message: statusCode === 500 ? 'Internal Server Error' : typeof message === 'string' && statusCode !== 404 ? message : error,
			data: null,
			errors: statusCode === 404 ? [error] :  typeof message === 'string' ? [message] : message
		});
	}
}