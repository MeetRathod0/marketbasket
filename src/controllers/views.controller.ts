import { Request, Response } from 'express';

export class ViewController {
	static index(req: Request, res: Response) {
		res.render('index');
	}
	static login(req: Request, res: Response) {
		res.render('login');
	}

	static otp(req: Request, res: Response) {
		res.render('otp');
	}
}
