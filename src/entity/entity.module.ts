import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityService } from './entity.service';
import { InvoiceDiscountEntity } from './entities/invoice-discount.entity';
import { TransactionEntity } from './entities/transaction.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
			InvoiceDiscountEntity,
			TransactionEntity
		])
    ],
    providers: [EntityService],
	exports: [EntityService]
})
export class EntityModule {}
