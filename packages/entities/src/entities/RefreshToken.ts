import { Type } from 'class-transformer';
import { IsInt, IsJWT, IsIP, ValidateNested } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Metadata } from './Metadata';
import { User } from './User';

@Entity()
export class RefreshToken {
	@PrimaryGeneratedColumn()
	@IsInt()
	id!: number;

	@Column({ unique: true })
	@IsJWT()
	token!: string;

	@Column()
	@IsIP()
	ip!: string;

	@Column(() => Metadata)
	@Type(() => Metadata)
	@ValidateNested()
	metadata!: Metadata;

	@ManyToOne(() => User, user => user.refreshTokens, { eager: true })
	@Type(() => User)
	@ValidateNested()
	user!: User;
}
