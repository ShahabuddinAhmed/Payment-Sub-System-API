import { IsNotEmpty, Length, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDiscountDto {
    @ApiProperty({
        example: 'PC665k5g4f5g4y5gf',
        description: 'Product Code of the Product'
    })
    @IsNotEmpty()
    @IsString()
    readonly productCode: string;

    @ApiProperty({
        example: 10001,
        description: 'User ID'
    })
    @IsNotEmpty()
    @IsString()
    readonly userID: string;

    @ApiProperty({
        example: 450,
        description: 'Invoice final amount'
    })
    @IsNotEmpty()
    @IsString()
    readonly finalAmount: number;
}
