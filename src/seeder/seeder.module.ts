import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { LoggerService } from '../logger/logger.service';

@Module({
    providers: [
        SeederService,
        LoggerService
    ]
})
export class SeederModule {}
