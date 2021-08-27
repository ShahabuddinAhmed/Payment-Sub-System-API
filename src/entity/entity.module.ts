import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityService } from './entity.service';
import { OptionEntity } from './entities/option.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
			OptionEntity
		])
    ],
    providers: [EntityService],
	exports: [EntityService]
})
export class EntityModule {}
