import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OptionEntity } from './entities/option.entity';

@Injectable()
export class EntityService {
    constructor(
        @InjectRepository(OptionEntity)
        public readonly optionRepo: Repository<OptionEntity>
    ) {}
}
