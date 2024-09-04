import { Request, Response, NextFunction } from 'express';
import { env } from '../configs/env.configs';
import jwt from 'jsonwebtoken';
import { responseMessages, responseCodes } from '../configs/const.configs';
import { IResponse } from '../models/response.models';

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const response: IResponse = {};
	try {
		const token: string = req.header('Authorization') || '';
		const verified = jwt.verify(token, env.SECRET_KEY);
		if (verified) {
			next();
		} else {
			response.message = responseMessages.TOKEN_INVALID();
			response.responseCode = responseCodes.UNAUTHORIZED;
			return res.status(responseCodes.UNAUTHORIZED).send(response);
		}
	} catch (error) {
		response.message = responseMessages.TOKEN_INVALID();
		response.responseCode = responseCodes.UNAUTHORIZED;
		response.error = error;
		return res.status(responseCodes.UNAUTHORIZED).send(response);
	}
};
