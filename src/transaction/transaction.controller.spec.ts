import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { EntityService } from '../entity/entity.service';
import { LoggerService } from '../logger/logger.service';
import { InvoiceDiscountEntity } from '../entity/entities/invoice-discount.entity';
import { TransactionEntity } from '../entity/entities/transaction.entity';
import { MockType, repositoryMockFactory } from '../utils/utils.helper';

describe('TransactionController', () => {
    let controller: TransactionController;
	let invoiceDiscountMockRepo: MockType<Repository<InvoiceDiscountEntity>>;
	let transactionMockRepo: MockType<Repository<TransactionEntity>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          	controllers: [TransactionController],
			providers: [
				TransactionService,
				EntityService,
				LoggerService,
                { provide: getRepositoryToken(InvoiceDiscountEntity), useFactory: repositoryMockFactory },
                { provide: getRepositoryToken(TransactionEntity), useFactory: repositoryMockFactory },
			]
        }).compile();

        controller = module.get<TransactionController>(TransactionController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
