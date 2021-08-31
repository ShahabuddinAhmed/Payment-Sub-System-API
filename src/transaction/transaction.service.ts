import { Injectable } from '@nestjs/common';
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

    public async checkInvoice(invoiceDiscountDto: InvoiceDiscountDto): Promise<{errMessage: string; data: { discount: number }}> {
        const data: { discount: number } = { discount: -1 };
		let parentID: number;

		let invoiceDiscount = await this.entityService.invoiceDiscountRepo.findOne({
			where: { productCode: invoiceDiscountDto.productCode } });
		if (!invoiceDiscount) {
			return { errMessage: 'Invalid Product Code', data: null };
		}

		if (invoiceDiscount.discount) {
			const discount = this.getDiscount(invoiceDiscountDto.finalAmount, invoiceDiscount.discount, invoiceDiscount.discountType);
			return { errMessage: '', data: { discount } };
		}

		if (!invoiceDiscount.parentID) {
			return { errMessage: '', data };
		}

		parentID = invoiceDiscount.parentID;
		while (true) {
			invoiceDiscount = await this.entityService.invoiceDiscountRepo.findOne({ where: { id: parentID } });
			if (!invoiceDiscount || invoiceDiscount.discount || !invoiceDiscount.parentID) {
				break;
			}
			parentID = invoiceDiscount.parentID;
		}

		if (!invoiceDiscount) {
			return { errMessage: 'Invalid Product Code', data: null };
		}

		if (invoiceDiscount.discount) {
			const discount = this.getDiscount(invoiceDiscountDto.finalAmount, invoiceDiscount.discount, invoiceDiscount.discountType);
			return { errMessage: '', data: { discount } };
		}

		return { errMessage: '', data };
    }

	private getDiscount(amount: number, discount: number, discountType: DiscountType): number {
		return discountType === DiscountType.Percentage ? Math.ceil(amount * (discount / 100)) : discount;
	};
}
