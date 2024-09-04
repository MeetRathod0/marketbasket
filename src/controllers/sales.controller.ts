import { Request, Response } from 'express';
import { ApprioriService } from '../services/appriori.services';

export const assocRulesController = async (req: Request, res: Response) => {
	await ApprioriService.calculate(req, res);
};
