import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ContractPhase } from './ContractPhase';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class Phase {
	@PrimaryGeneratedColumn()
	@IsOptional()
	@IsInt()
	id!: number;

	@Column({ unique: true })
	@IsString()
	name!: string;

	@OneToMany(
		() => ContractPhase,
		contractPhase => contractPhase.phase,
		{ cascade: true }
	)
	@ValidateNested({ each: true })
	@Type(() => ContractPhase)
	contractPhases!: ContractPhase[];
}
