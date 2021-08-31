import { Injectable, OnModuleInit } from '@nestjs/common';
import { EntityService } from '../entity/entity.service';
import { data } from './data';

@Injectable()
export class SeederService implements OnModuleInit {
    constructor(
        private readonly entityService: EntityService
    ) { }

    async onModuleInit() {
        await this.seed();
    }

	// Seeder is added this way. It will be implemented another best way. but In sort time i will be added this way
    public async seed() {
        const count = await this.entityService.invoiceDiscountRepo.count();
        if (!count) {
            await this.entityService.invoiceDiscountRepo.save(data);
        }
    }
}
