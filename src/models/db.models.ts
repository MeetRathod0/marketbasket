import {
	PrimaryGeneratedColumn,
	Entity,
	Column,
	BeforeInsert,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity('user_types')
export class UserTypes {
	@PrimaryGeneratedColumn()
	id: number;
	@Column('varchar', { length: 128 })
	name: string;
	@Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', nullable: true })
	created_datetime: string;
	@Column('timestamp', { nullable: true })
	updated_datetime: string;
	@Column('int', { nullable: true })
	updated_by: number;
}

@Entity('users')
export class Users {
	@PrimaryGeneratedColumn()
	id: number;
	@Column('varchar', { length: 128, nullable: false })
	name: string;
	@Column('varchar', { length: 128, nullable: false })
	email: string;
	@Column('varchar', { length: 128, nullable: false })
	phone: string;
	@Column('int', { nullable: true })
	user_type_id: number;
	@Column('smallint', { nullable: true })
	is_active: number;
	@Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', nullable: true })
	created_datetime: string;
	@Column('timestamp', { nullable: true })
	updated_datetime: string;
	@Column('int', { nullable: true })
	updated_by: number;
}

@Entity('user_password')
export class UsersPassword {
	@PrimaryGeneratedColumn()
	id: number;
	@ManyToOne(() => Users)
	@JoinColumn({ name: 'user_id' })
	user_id: Users;
	@Column('varchar', { length: 128, nullable: false })
	password: string;
	@Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', nullable: true })
	created_datetime: string;
	@Column('timestamp', { nullable: true })
	updated_datetime: string;

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
	async validatePassword(password: string): Promise<boolean> {
		return bcrypt.compare(password, this.password);
	}
}

@Entity('sales')
export class Sales {
	@PrimaryGeneratedColumn()
	id: number;
	@Column('date', { nullable: true })
	date: string;
	@Column('varchar', { length: 256, nullable: true })
	category: string;
	@Column('varchar', { length: 256, nullable: true })
	size: string;
	@Column('int', { nullable: true })
	qty: number;
	@Column('float', { nullable: true })
	amount: number;
	@ManyToOne(() => Users)
	sales_person_id: Users;
}

@Entity('otp_session')
export class OtpSession {
	@PrimaryGeneratedColumn()
	id: number;
	@Column('char', { length: 6 })
	otp: string;
	@ManyToOne(() => Users)
	@JoinColumn({ name: 'user_id' })
	user_id: Users;
	@Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', nullable: true })
	created_datetime: string;
	@Column('timestamp', { nullable: true })
	expire_datetime: string;
	@Column('smallint', { nullable: true })
	is_active: number;
}
