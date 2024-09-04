import { DataSource } from 'typeorm';
import { env } from './env.configs';
import {
	UserTypes,
	Users,
	UsersPassword,
	Sales,
	OtpSession,
} from '../models/db.models';

export const pgSource = new DataSource({
	type: 'postgres',
	host: env.DB_HOST,
	port: env.DB_PORT,
	username: env.DB_USERNAME,
	password: env.DB_PASSWORD,
	database: env.DB_NAME,
	synchronize: true,
	entities: [UserTypes, Users, UsersPassword, Sales, OtpSession],
});


export const dbInit = ()=>{
	pgSource
		.initialize()
		.then(() => {
			console.log('Database is connected');
		})
		.catch((error) => {
			console.log('Database is not able to connect!.', error);
		});
}