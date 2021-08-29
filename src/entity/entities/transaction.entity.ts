import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('transaction')
export class TransactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    productCode: string;

    @Column({
        type: 'int',
        nullable: false
    })
    userID: number;

    @Column({
        type: 'double',
        nullable: false,
    })
    finalAmount: number;

	@Column({
        type: 'double',
        nullable: false,
    })
    discountAmount: number;

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