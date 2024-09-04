import twilio, { Twilio } from 'twilio';
import { env } from '../configs/env.configs';
import { generateOTP } from '../utils/string.utils';
export const sendSMS = async (contact: string, message: string) => {
	const client: Twilio = twilio(env.TWILLOW_SID_TOKEN, env.TWILLOW_AUTH_TOKEN);
	let result;
	client.messages
		.create({
			body: message,
			from: '+12402933865',
			to: contact,
		})
		.then((message) => {
			result = message;
		})
		.catch((error) => {
			result = error;
		});
	return result;
};

export const sendOTP = async (contact: string) => {
	try {
		const otp = generateOTP(6);
		const result = await sendSMS(contact, `Your verification code is: ${otp}`);
		return result;
	} catch (error) {
		return error;
	}
};
