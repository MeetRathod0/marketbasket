import dotenv from 'dotenv';
dotenv.config();

const str = (key: string): string => {
	const val: string | undefined = process.env[key];
	if (val === undefined) {
		throw new Error(`${key} is not defined in .env file`);
	}
	return val;
};

const num = (key: string): number => {
	const val: string | undefined = process.env[key];
	const asNum = Number(val);
	if (val === undefined || isNaN(asNum)) {
		throw new Error(
			`${key} is not defined in .env file or ${key} must be number.`
		);
	}
	return asNum;
};

interface Env {
	DB_NAME: string;
	DB_USERNAME: string;
	DB_PASSWORD: string;
	DB_HOST: string;
	DB_PORT: number;
	SECRET_KEY: string;
	PORT: number;
	TWILLOW_SID_TOKEN: string;
	TWILLOW_AUTH_TOKEN: string;
	EMAIL_USERNAME: string;
	EMAIL_PASSWORD: string;
}

export const env: Env = {
	PORT: num('PORT'),
	DB_NAME: str('DB_NAME'),
	DB_USERNAME: str('DB_USERNAME'),
	DB_PASSWORD: str('DB_PASSWORD'),
	DB_HOST: str('DB_HOST'),
	DB_PORT: num('DB_PORT'),
	SECRET_KEY: str('SECRET_KEY'),
	TWILLOW_AUTH_TOKEN: str('TWILLOW_AUTH_TOKEN'),
	TWILLOW_SID_TOKEN: str('TWILLOW_SID_TOKEN'),
	EMAIL_USERNAME: str('EMAIL_USERNAME'),
	EMAIL_PASSWORD: str('EMAIL_PASSWORD'),
};
