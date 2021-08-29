import { Injectable } from '@nestjs/common';
import { InvoiceDiscountDto } from './dto/invoice-discount.dto';
import { EntityService } from '../entity/entity.service';
import { LoggerService } from '../logger/logger.service';
import { Request } from 'express';

@Injectable()
export class TransactionService {
    constructor(
        private readonly entityService: EntityService,
        private readonly loggerService: LoggerService
    ) { }

    public async checkInvoice(req: Request, invoiceDiscountDto: InvoiceDiscountDto): Promise<{errMessage: string; data: any}> {
        const data = null;
		// find categoryID from productCode.
		// if invaid productCode then return as error.
		// lets productCode is valid. then
		const categoryID = 3;
		const invoiceDiscounts = await this.entityService.invoiceDiscountRepo.find();
		if (!invoiceDiscounts.length) {
			return { errMessage: 'Product Category is empty', data };
		}

		// invoiceDiscounts.forEach(value => {
		// 	const isExit = invoiceDiscounts.find(val => val.id === categoryID);
		// });

		const isExit = invoiceDiscounts.find(val => val.id === categoryID);
		if (!isExit) {
			return { errMessage: 'No Product Category was found', data };
		}
		for (const invoiceDiscount of invoiceDiscounts) {
			const isExit = invoiceDiscounts.find(val => val.id === categoryID);
		}
        return { errMessage: '', data };
    }
}
