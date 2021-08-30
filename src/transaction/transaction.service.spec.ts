import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { EntityModule } from '../entity/entity.module';
import { EntityService } from '../entity/entity.service';
import { InvoiceDiscountEntity } from '../entity/entities/invoice-discount.entity';
import { TransactionEntity } from '../entity/entities/transaction.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

describe('TransactionService', () => {
    let transactionService: TransactionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRootAsync({
                    useFactory: async () => ({
                        type: 'mysql',
                        host: '172.31.0.1',
                        port: 3306,
                        username: 'root',
                        password: 'root',
                        database: 'payment',
                        entities: [InvoiceDiscountEntity, TransactionEntity],
                        synchronize: true,
                        extra: {
                            connectionLimit: 10
                        }
                    })
                }),
                EntityModule
            ],
            providers: [
                TransactionService,
                {
                    provide: getRepositoryToken(InvoiceDiscountEntity),
                    useClass: Repository
                },
                {
                    provide: getRepositoryToken(TransactionEntity),
                    useClass: Repository
                }
            ],
        }).compile();

        transactionService = module.get<TransactionService>(TransactionService);
    });

    it('should be defined', () => {
        expect(transactionService).toBeDefined();
    });
});
