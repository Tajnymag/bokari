import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsString, Matches, ValidateNested } from 'class-validator';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ContractAttachment } from './ContractAttachment';
import { ContractPhase } from './ContractPhase';
import { Customer } from './Customer';
import { Metadata } from './Metadata';
import { Monetary } from './Monetary';
import { WorkLog } from './WorkLog';

@Entity()
@Index('contract_name_trgm', { synchronize: false })
export class Contract {
	@PrimaryGeneratedColumn()
	@IsInt()
	id!: number;

	@Column({ unique: true })
	@IsString()
	@Matches(/^\d{5}$/)
	code!: string;

	@Column()
	@IsString()
	name!: string;

	@Column({ nullable: true })
	@IsString()
	description?: string;

	@Column('timestamptz')
	@Type(() => Date)
	@IsDate()
	startAt!: Date;

	@Column('timestamptz')
	@Type(() => Date)
	@IsDate()
	deadlineAt!: Date;

	@Column({ default: false })
	@IsBoolean()
	isDone!: boolean;

	@Column(() => Metadata)
	@Type(() => Metadata)
	@ValidateNested()
	metadata!: Metadata;

	@ManyToOne(() => Customer, customer => customer.contracts, { eager: true, nullable: false })
	@Type(() => Customer)
	@ValidateNested()
	customer!: Customer;

	@Column(() => Monetary)
	@Type(() => Monetary)
	@ValidateNested()
	price!: Monetary;

	@OneToMany(() => ContractAttachment, attachment => attachment.contract, { cascade: true })
	@Type(() => ContractAttachment)
	@ValidateNested({ each: true })
	attachments!: ContractAttachment[];

	@OneToMany(() => WorkLog, workLog => workLog.contract)
	@Type(() => WorkLog)
	@ValidateNested({ each: true })
	workLogs!: WorkLog[];

	@OneToMany(() => ContractPhase, phase => phase.contract, { eager: true, cascade: true })
	@Type(() => ContractPhase)
	@ValidateNested({ each: true })
	contractPhases!: ContractPhase[];
}
