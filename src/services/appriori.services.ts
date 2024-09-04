import { pgSource } from '../configs/db.configs';
import { Sales } from '../models/db.models';
import { IAprioriInput } from '../models/request.models';
import { Apriori } from 'node-apriori';
import { Request, Response } from 'express';
import { IResponse } from '../models/response.models';
import { responseCodes, responseMessages } from '../configs/const.configs';
//import { generateOTP } from './sms.services';
//import { sendOTP } from './mail.services';

export class ApprioriService {
	static async calculate(req: Request, res: Response) {
		//await sendOTP('rathodmeet.26@gmail.com', generateOTP(6));
		const response: IResponse = {};
		try {
			const input: IAprioriInput = req.body;
			if (input.to === null || input.to === undefined) {
				input.to = input.from;
			}
			let query: string = '';
			if (input.by === 'month') {
				query = "date_part('month',date) BETWEEN :from AND :to ";
			} else if (input.by === 'year') {
				query = "date_part('year',date) BETWEEN :from AND :to ";
			} else {
				query = "date BETWEEN ':from' AND ':to' ";
			}
			const sales = await pgSource
				.getRepository(Sales)
				.createQueryBuilder('sale')
				.select(['sale.date', 'sale.category'])
				.where(query, {
					from: input.from,
					to: input.to,
				})
				.getMany();

			const transac = sales.reduce((acc: { [key: string]: string[] }, sale) => {
				const date: string = sale.date.toString().split('T')[0];
				if (!acc[date]) {
					acc[date] = [];
				}
				acc[date].push(sale.category);
				return acc;
			}, {});

			const transactions = Object.values(transac);
			const apriori = new Apriori(0.5);
			const rules = await apriori.exec(transactions);

			response.data = rules;
			response.message = responseMessages.RULES_GENERATED();
			response.responseCode = responseCodes.OK;
			response.status = 1;
			return res.status(responseCodes.OK).send(response);
		} catch (error) {
			response.message = responseMessages.RULES_GENERATION_ERROR();
			response.error = error;
			response.status = 0;
			response.responseCode = responseCodes.INTERNAL_SERVER_ERROR;
			return res.status(responseCodes.INTERNAL_SERVER_ERROR).send(response);
		}
	}
}

export const fetchTransactionsByInvoiceDate = async (
	req: Request,
	res: Response
) => {
	const input: IAprioriInput = req.body;
	// Fetch the sales grouped by InvoiceDate
	const sales = await pgSource
		.getRepository(Sales)
		.createQueryBuilder('sale')
		.select(['sale.date', 'sale.category'])
		.where("date_part('month',date) BETWEEN :from AND :to ", {
			from: input.from,
			to: input.to,
		})
		.getMany();

	// Group sales by InvoiceDate
	const transac = sales.reduce((acc: { [key: string]: string[] }, sale) => {
		const date: string = sale.date.toString().split('T')[0];
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(sale.category);
		return acc;
	}, {});

	//return res.send(Object.values(transac));
	const transactions = Object.values(transac);

	const apriori = new Apriori(0.5); // (minSupport, minConfidence, debug)
	// apriori.on('data', (itemset) => {
	// 	//console.log(`Itemset: ${itemset.items} Support: ${itemset.support}`);
	// });

	const rules = await apriori.exec(transactions);
	// apriori.exec(transactions).then((result) => {
	// 		rules['data'] = result.itemsets;

	// 		console.log('Frequent Itemsets:', result.itemsets);
	// 		//console.log('Association Rules:', result.executionTime);
	// 	});
	//console.log(rules);
	return res.send(rules);
};
