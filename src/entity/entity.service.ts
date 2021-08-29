import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceDiscountEntity } from './entities/invoice-discount.entity';
import { TransactionEntity } from './entities/transaction.entity';

@Injectable()
export class EntityService {
    constructor(
        @InjectRepository(InvoiceDiscountEntity)
        public readonly invoiceDiscountRepo: Repository<InvoiceDiscountEntity>,
        @InjectRepository(TransactionEntity)
        public readonly transactionRepo: Repository<TransactionEntity>
    ) {}
}
