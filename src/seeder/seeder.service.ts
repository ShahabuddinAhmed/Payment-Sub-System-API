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

    public async seed() {
        const count = await this.entityService.invoiceDiscountRepo.count();
        if (!count) {
            await this.entityService.invoiceDiscountRepo.save(data);
        }
    }
}
