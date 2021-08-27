import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('option')
export class OptionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    key: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false
    })
    createdTime: Date | string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false
    })
    updatedTime: Date | string;

    @CreateDateColumn({
        type: 'datetime',
        nullable: true,
        select: false
    })
    createdAt: Date | string;

    @UpdateDateColumn({
        type: 'datetime',
        nullable: true,
        select: false
    })
    updatedAt: Date | string;

    @Column({
        type: 'text',
        nullable: false,
    })
    value: string;

    @Column({
        type: 'text',
        nullable: false
    })
    type: string;
}