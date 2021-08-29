import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InvoiceDiscountDto } from './dto/invoice-discount.dto';
import { EntityService } from '../entity/entity.service';
import { LoggerService } from '../logger/logger.service';
import { DiscountType } from '../utils/utils.enum';

@Injectable()
export class TransactionService {
    constructor(
        private readonly entityService: EntityService,
        private readonly loggerService: LoggerService
    ) { }

    public async checkInvoice(req: Request, invoiceDiscountDto: InvoiceDiscountDto): Promise<{errMessage: string; data: { discount: number }}> {
        const data: { discount: number } = { discount: -1 };
		// find categoryID from productCode.
		// if invaid productCode then return as error.
		// lets productCode is valid. then
		const categoryID = 5;
		let parentID: number;
		let discountNotFound = true;

		const invoiceDiscounts = await this.entityService.invoiceDiscountRepo.find();
		if (!invoiceDiscounts.length) {
			return { errMessage: 'Product Category is empty', data };
		}

		const checkCategory = invoiceDiscounts.find(value => value.id === categoryID);
		if (!checkCategory) {
			return { errMessage: 'No Product Category was found', data };
		}

		if (checkCategory.discount) {
			const discount = this.getDiscount(invoiceDiscountDto.finalAmount, checkCategory.discount, checkCategory.discountType);
			discountNotFound = false;
			return { errMessage: '', data: { discount } };
		}

		parentID = checkCategory.parentID;
		while (discountNotFound) {
			const _checkCategory = invoiceDiscounts.find(value => value.id === parentID);
			if (_checkCategory.discount) {
				const discount = this.getDiscount(invoiceDiscountDto.finalAmount, _checkCategory.discount, _checkCategory.discountType);
				discountNotFound = false;
				return { errMessage: '', data: { discount } };
			}

			if (_checkCategory.id === _checkCategory.parentID) {
				discountNotFound = false;
			}
			parentID = _checkCategory.parentID;
		}
		return { errMessage: '', data };
    }

	private getDiscount(amount: number, discount: number, discountType: DiscountType): number {
		return discountType === DiscountType.Percentage ? Math.ceil(amount * (discount / 100)) : discount;
	};
}
