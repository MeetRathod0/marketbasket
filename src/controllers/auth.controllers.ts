import { Request, Response } from 'express';
import {
	loginUserService,
	createUserPasswordService,
	verifyEmailService,
	verifyOTPService,
} from '../services/auth.services';

export class AuthController {
	public static async login(req: Request, res: Response) {
		await loginUserService(req, res);
	}

	public static async register(req: Request, res: Response) {
		await loginUserService(req, res);
	}
	public static async makepass(req: Request, res: Response) {
		await createUserPasswordService(req, res);
	}

	public static async verifyEmail(req: Request, res: Response) {
		await verifyEmailService(req, res);
	}
	public static async verifyOTP(req: Request, res: Response) {
		await verifyOTPService(req, res);
	}
}
