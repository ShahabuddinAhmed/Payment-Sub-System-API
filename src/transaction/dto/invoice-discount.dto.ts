import { IsNotEmpty, Length, IsEmail, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDiscountDto {
    @ApiProperty({
        example: 'a4def1759c724f40ad3081671302cd4f',
        description: 'Product Code of the Product'
    })
    @IsNotEmpty()
    @IsString()
    readonly productCode: string;

    @ApiProperty({
        example: 10001,
        description: 'User ID'
    })
    @IsNumber()
    readonly userID: number;

    @ApiProperty({
        example: 1280,
        description: 'Invoice final amount'
    })
    @IsNumber()
    readonly finalAmount: number;
}
