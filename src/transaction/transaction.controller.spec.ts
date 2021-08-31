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
import { InvoiceDiscountDto } from './dto/invoice-discount.dto';
import { DiscountType } from '../utils/utils.enum';

describe('TransactionController', () => {
    let transactionController: TransactionController;
    let transactionService: TransactionService;
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

        transactionController = module.get<TransactionController>(TransactionController);
    });

    it('should be defined', () => {
        expect(transactionController).toBeDefined();
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

        // invoiceDiscountMockRepo.findOne.mockReturnValue(mockInvoiceDiscount);
        // const invoiceDiscount = await transactionService.checkInvoice(dto);
        const checkInvoice = await transactionController.checkInvoice(dto);

        expect(checkInvoice).toEqual({ errMessage: '', data: { discount: 77 } });
    });

    // it('should be return discount amount -1', async () => {
    //     const dto: InvoiceDiscountDto = {
    //         productCode: '002e3c5828f543f299045f7c8e2182e5',
    //         userID: 100001,
    //         finalAmount: 1280
    //     }

    //     const mockInvoiceDiscount = {
    //         id: 6,
    //         name: 'Electronics',
    //         productCode: '371828b4abee403baaf45151d3cf5102',
    //         parentID: null,
    //         discount: 0,
    //         discountType: DiscountType.Flat
    //     };

    //     // invoiceDiscountMockRepo.findOne.mockReturnValue(mockInvoiceDiscount);
    //     // const invoiceDiscount = await transactionService.checkInvoice(dto);
    //     const checkInvoice = await transactionController.checkInvoice(dto);

    //     expect(checkInvoice).toEqual({ errMessage: '', data: { discount: -1 } });
    // });
});
