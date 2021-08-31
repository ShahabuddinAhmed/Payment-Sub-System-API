import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransactionService } from './transaction.service';
import { EntityService } from '../entity/entity.service';
import { LoggerService } from '../logger/logger.service';
import { InvoiceDiscountEntity } from '../entity/entities/invoice-discount.entity';
import { TransactionEntity } from '../entity/entities/transaction.entity';
import { MockType, repositoryMockFactory } from '../utils/utils.helper';
import { InvoiceDiscountDto } from './dto/invoice-discount.dto';
import { DiscountType } from '../utils/utils.enum';

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
    
    it('should be return discount amount', async () => {
        const dto: InvoiceDiscountDto = {
            productCode: '002e3c5828f543f299045f7c8e2182e5',
            userID: 100001,
            finalAmount: 1280
        }

        const mockInvoiceDiscount = {
            id: 4,
            name: 'Frozen',
            productCode: '002e3c5828f543f299045f7c8e2182e5',
            parentID: 2,
            discount: 6,
            discountType: DiscountType.Percentage
        };

        invoiceDiscountMockRepo.findOne.mockReturnValue(mockInvoiceDiscount);
        const invoiceDiscount = await transactionService.checkInvoice(dto);

        expect(invoiceDiscount).toEqual({ errMessage: '', data: { discount: 77 } });
    });

    it('should be return discount amount -1', async () => {
        const dto: InvoiceDiscountDto = {
            productCode: '002e3c5828f543f299045f7c8e2182e5',
            userID: 100001,
            finalAmount: 1280
        }

        const mockInvoiceDiscount = {
            id: 6,
            name: 'Electronics',
            productCode: '371828b4abee403baaf45151d3cf5102',
            parentID: null,
            discount: 0,
            discountType: DiscountType.Flat
        };

        invoiceDiscountMockRepo.findOne.mockReturnValue(mockInvoiceDiscount);
        const invoiceDiscount = await transactionService.checkInvoice(dto);

        expect(invoiceDiscount).toEqual({ errMessage: '', data: { discount: -1 } });
    });

	it('should be calculate discount price with 0', async () => {
        const finalAmount = 1280;
        const mockInvoiceDiscount = {
            id: 6,
            name: 'Electronics',
            productCode: '371828b4abee403baaf45151d3cf5102',
            parentID: null,
            discount: 0,
            discountType: DiscountType.Flat
        };

        invoiceDiscountMockRepo.findOne.mockReturnValue(mockInvoiceDiscount);
        const discount = transactionService.getDiscount(finalAmount, mockInvoiceDiscount.discount, mockInvoiceDiscount.discountType);

        expect(discount).toEqual(0);
    });

	it('should be calculate discount price with 120', async () => {
        const finalAmount = 1280;
        const mockInvoiceDiscount = {
            id: 6,
            name: 'Electronics',
            productCode: '371828b4abee403baaf45151d3cf5102',
            parentID: null,
            discount: 120,
            discountType: DiscountType.Flat
        };

        invoiceDiscountMockRepo.findOne.mockReturnValue(mockInvoiceDiscount);
        const discount = transactionService.getDiscount(finalAmount, mockInvoiceDiscount.discount, mockInvoiceDiscount.discountType);

        expect(discount).toEqual(120);
    });

	it('should be calculate discount price with 154', async () => {
        const finalAmount = 1280;
        const mockInvoiceDiscount = {
            id: 6,
            name: 'Electronics',
            productCode: '371828b4abee403baaf45151d3cf5102',
            parentID: null,
            discount: 12,
            discountType: DiscountType.Percentage
        };

        invoiceDiscountMockRepo.findOne.mockReturnValue(mockInvoiceDiscount);
        const discount = transactionService.getDiscount(finalAmount, mockInvoiceDiscount.discount, mockInvoiceDiscount.discountType);

        expect(discount).toEqual(154);
    });
});
