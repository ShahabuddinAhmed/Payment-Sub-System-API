import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DiscountType } from '../../utils/utils.enum';


@Entity('invoice_discount')
export class InvoiceDiscountEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    categoryName: string;

    @Column({
        type: 'int',
        nullable: true
    })
    parentID: number;

    @Column({
        type: 'double',
        nullable: false,
		default: 0
    })
    discount: number;

    @Column({
        type: 'enum',
		enum: DiscountType,
        nullable: false,
		default: DiscountType.Flat
    })
    discountType: DiscountType;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true,
        select: false
    })
    createdAt: Date | string;

    @UpdateDateColumn({
        type: 'timestamp',
        nullable: true,
        select: false
    })
    updatedAt: Date | string;
}