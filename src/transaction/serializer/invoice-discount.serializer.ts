import { Exclude, plainToClass } from 'class-transformer';
import { AppSerializer } from '../../app.serializer';

class InvoiceSerializer {
	// @Exclude()
	// id: number;

	discount: number
}

export class InvoiceDiscountSerializer extends AppSerializer {

	constructor(statusCode: number, message: string, data: any, errors: any, optional?: Record<string, unknown>) {
		super(statusCode, message, plainToClass(InvoiceSerializer, data), errors);
	}
}