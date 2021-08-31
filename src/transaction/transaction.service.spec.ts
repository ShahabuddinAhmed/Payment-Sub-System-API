import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { EntityService } from '../entity/entity.service';
import { LoggerService } from '../logger/logger.service';
import { InvoiceDiscountEntity } from '../entity/entities/invoice-discount.entity';
import { TransactionEntity } from '../entity/entities/transaction.entity';
import { MockType, repositoryMockFactory } from '../utils/utils.helper';

describe('TransactionService', () => {
    let transactionService: TransactionService;
	let invoiceDiscountMockRepo: MockType<Repository<InvoiceDiscountEntity>>;
	let transactionMockRepo: MockType<Repository<TransactionEntity>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransactionService,
				EntityService,
				LoggerService,
                { provide: getRepositoryToken(InvoiceDiscountEntity), useFactory: repositoryMockFactory },
                { provide: getRepositoryToken(TransactionEntity), useFactory: repositoryMockFactory },
            ],
        }).compile();

        transactionService = module.get<TransactionService>(TransactionService);
		invoiceDiscountMockRepo = module.get(getRepositoryToken(InvoiceDiscountEntity));
		transactionMockRepo = module.get(getRepositoryToken(TransactionEntity));
    });

    it('should be defined', () => {
        expect(transactionService).toBeDefined();
    });
});
