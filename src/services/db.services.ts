import { ObjectLiteral, EntityTarget } from 'typeorm';
import { pgSource } from '../configs/db.configs';

export const dbSelect = async (
	model: EntityTarget<ObjectLiteral>,
	condition: object = {}
) => {
	const obj = await pgSource.getRepository(model);
	if (Object.keys(condition).length === 0) {
		return await pgSource.manager.find(model);
	}
	return await obj.findBy(condition);
};

export const dbInsert = async (
	model: EntityTarget<ObjectLiteral>,
	data: object
) => {
	const obj = await pgSource.getRepository(model).create(data);
	return await pgSource.getRepository(model).save(obj);
};

export const dbUpdate = async (
	model: EntityTarget<ObjectLiteral>,
	strCondition: string,
	condition: object,
	data: object
) => {
	return await pgSource
		.createQueryBuilder()
		.update(model)
		.set(data)
		.where(strCondition, condition)
		.execute();
};
