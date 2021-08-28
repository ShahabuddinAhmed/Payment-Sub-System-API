import { Injectable } from '@nestjs/common';
import { InvoiceDiscountDto } from './dto/invoice-discount.dto';
import { LoggerService } from '../logger/logger.service';
import { Request } from 'express';

@Injectable()
export class TransactionService {
    constructor(
        private readonly loggerService: LoggerService
    ) { }

    public async checkInvoice(req: Request, invoiceDiscountDto: InvoiceDiscountDto): Promise<{errMessage: string; data: any}> {
        const data = null;
        return { errMessage: '', data };
    }
}
