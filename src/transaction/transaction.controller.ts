import {
    Controller, UseInterceptors, ClassSerializerInterceptor, Post, HttpStatus, HttpCode,
    Req, Body, Get, BadRequestException
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { LoggerService } from '../logger/logger.service';
import { InvoiceDiscountDto } from './dto/invoice-discount.dto';
import { InvoiceDiscountSerializer } from './serializer/invoice-discount.serializer';
import { Request } from 'express';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
    constructor(
        private readonly authService: TransactionService,
        private readonly loggerService: LoggerService
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('check-discount')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Check Invoice Discount' })
    @ApiCreatedResponse({})
    async checkInvoice(@Req() req: Request, @Body() invoiceDiscountDto: InvoiceDiscountDto): Promise<InvoiceDiscountSerializer> {
        const { errMessage } = await this.authService.checkInvoice(req, invoiceDiscountDto);
        if (errMessage) {
            this.loggerService.error(errMessage, 'transaction.handler.checkInvoice');
            throw new BadRequestException(errMessage);
        }
        return new InvoiceDiscountSerializer(HttpStatus.OK, 'Invoice Discount Result', null, []);
    }
}
