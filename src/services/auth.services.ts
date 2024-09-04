import { IResponse } from '../models/response.models';
import { responseMessages, responseCodes } from '../configs/const.configs';
import jwt from 'jsonwebtoken';
import { env } from '../configs/env.configs';
import { Request, Response } from 'express';
import { dbInsert, dbSelect, dbUpdate } from './db.services';
import { UsersPassword, Users, OtpSession } from '../models/db.models';
import { pgSource } from '../configs/db.configs';
import { generateOTP } from '../utils/string.utils';
import { sendOTPMail } from './mail.services';
import { decryptText } from '../utils/string.utils';
//import { passwordChangeSchema } from '../models/validation.models';

export const loginUserService = async (req: Request, res: Response) => {
	const response: IResponse = {};
	try {
		const user = await pgSource.manager.query(
			`SELECT u.id,p.password,u.email,u.phone,u.name FROM users u INNER JOIN user_password p ON u.id=p.user_id WHERE u.is_active=1 and u.email='${req.body.email}'`
		);

		if (user.length === 0) {
			response.message = responseMessages.LOGIN_ERROR();
			response.status = 0;
			response.responseCode = responseCodes.UNAUTHORIZED;
			return res.status(responseCodes.UNAUTHORIZED).send(response);
		}

		if (!(await decryptText(req.body.password, user[0].password))) {
			response.message = responseMessages.LOGIN_ERROR();
			response.status = 0;
			response.responseCode = responseCodes.UNAUTHORIZED;
			return res.status(responseCodes.UNAUTHORIZED).send(response);
		}

		if (req.body.otp == null || req.body.otp == undefined) {
			return await verifyEmailService(req, res);
		}

		const isOtp = await dbSelect(OtpSession, {
			user_id: user[0].id,
			is_active: 1,
		});

		const curTime = new Date();
		const otpTime = new Date(isOtp[0].expire_datetime);
		if (isOtp[0].otp !== req.body.otp) {
			response.message = responseMessages.OTP_NOT_MATCHED();
			response.responseCode = responseCodes.UNAUTHORIZED;
			response.status = 0;
			return res.status(responseCodes.UNAUTHORIZED).send(response);
		}
		if (
			new Date(curTime.toISOString().replace(/T/, ' ').replace(/\..+/, '')) >
			otpTime
		) {
			await dbUpdate(
				OtpSession,
				'user_id = :id',
				{ id: user[0].id },
				{ is_active: 0 }
			);
			response.message = responseMessages.OTP_EXPIRED();
			response.responseCode = responseCodes.UNAUTHORIZED;
			response.status = 0;
			return res.status(responseCodes.UNAUTHORIZED).send(response);
		}

		await dbUpdate(
			OtpSession,
			'user_id = :id',
			{ id: user[0].id },
			{ is_active: 0 }
		);
		response.message = responseMessages.OTP_MATCHED();
		response.responseCode = responseCodes.OK;
		const token = jwt.sign(
			{ username: user[0].name, email: user[0].email, user_id: user[0].id },
			env.SECRET_KEY,
			{
				expiresIn: '1h',
			}
		);

		response.message = responseMessages.LOGIN_SUCCESS();
		response.data = token;
		response.responseCode = responseCodes.OK;
		return res.status(responseCodes.OK).json(response);
	} catch (error) {
		response.message = responseMessages.LOGIN_ERROR();
		response.error = error;
		response.responseCode = responseCodes.INTERNAL_SERVER_ERROR;
		return res.status(responseCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};

export const createUserPasswordService = async (
	req: Request,
	res: Response
) => {
	const response: IResponse = {};
	try {
		//passwordChangeSchema.validate({password:req.body.password});
		const data = await dbInsert(UsersPassword, req.body);
		response.message = responseMessages.CREATE_SUCCESS('Password');
		response.data = data;
		response.responseCode = responseCodes.OK;
		return res.status(responseCodes.OK).json(response);
	} catch (error) {
		response.message = responseMessages.CREATE_ERROR('Password');
		response.error = error;
		response.responseCode = responseCodes.INTERNAL_SERVER_ERROR;
		return res.status(responseCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};

export const verifyEmailService = async (req: Request, res: Response) => {
	const response: IResponse = {};
	try {
		const isUser = await dbSelect(Users, {
			email: req.body.email,
			is_active: 1,
		});
		if (isUser.length <= 0) {
			response.message = responseMessages.INVALID_USER();
			response.responseCode = responseCodes.UNAUTHORIZED;
			response.status = 0;
			return res.status(responseCodes.UNAUTHORIZED).send(response);
		}
		const otp = generateOTP(6);

		const curTime = new Date();
		const cTime = curTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
		curTime.setMinutes(curTime.getMinutes() + 10);
		const eTime = curTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
		const input = {
			otp: otp,
			created_datetime: cTime,
			expire_datetime: eTime,
			user_id: isUser[0].id,
			is_active: 1,
		};
		sendOTPMail(isUser[0].email, otp);
		await dbUpdate(
			OtpSession,
			'user_id = :id',
			{ id: isUser[0].id },
			{ is_active: 0 }
		);
		await dbInsert(OtpSession, input);
		response.message = responseMessages.OTP_SENT_SUCCESSFULLY();
		response.data = [];
		response.responseCode = responseCodes.OK;
		return res.status(responseCodes.OK).json(response);
	} catch (error) {
		response.message = responseMessages.OTP_SENT_ERROR();
		response.error = error;
		response.responseCode = responseCodes.INTERNAL_SERVER_ERROR;
		return res.status(responseCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};

export const verifyOTPService = async (req: Request, res: Response) => {
	const response: IResponse = {};
	try {
		const isUser = await dbSelect(Users, {
			email: req.body.email,
			is_active: 1,
		});
		if (isUser.length <= 0) {
			response.message = responseMessages.INVALID_USER();
			response.responseCode = responseCodes.UNAUTHORIZED;
			response.status = 0;
			return res.status(responseCodes.UNAUTHORIZED).send(response);
		}

		const isOtp = await dbSelect(OtpSession, {
			user_id: isUser[0].id,
			is_active: 1,
		});

		const curTime = new Date();
		const otpTime = new Date(isOtp[0].expire_datetime);
		if (isOtp[0].otp !== req.body.otp) {
			response.message = responseMessages.OTP_NOT_MATCHED();
			response.responseCode = responseCodes.UNAUTHORIZED;
			response.status = 0;
			return res.status(responseCodes.UNAUTHORIZED).send(response);
		}
		if (
			new Date(curTime.toISOString().replace(/T/, ' ').replace(/\..+/, '')) >
			otpTime
		) {
			await dbUpdate(
				OtpSession,
				'user_id = :id',
				{ id: isUser[0].id },
				{ is_active: 0 }
			);
			response.message = responseMessages.OTP_EXPIRED();
			response.responseCode = responseCodes.UNAUTHORIZED;
			response.status = 0;
			return res.status(responseCodes.UNAUTHORIZED).send(response);
		}

		await dbUpdate(
			OtpSession,
			'user_id = :id',
			{ id: isUser[0].id },
			{ is_active: 0 }
		);
		response.message = responseMessages.OTP_MATCHED();
		response.responseCode = responseCodes.OK;
		return res.status(responseCodes.OK).json(response);
	} catch (error) {
		response.message = responseMessages.SERVER_ERROR();
		response.error = error;
		response.responseCode = responseCodes.INTERNAL_SERVER_ERROR;
		return res.status(responseCodes.INTERNAL_SERVER_ERROR).json(response);
	}
};
