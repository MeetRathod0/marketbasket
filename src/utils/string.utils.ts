import bcrypt from 'bcrypt';

export const generateOTP = (length: number) => {
	const digits = '0123456789';
	let otp = '';
	for (let i = 0; i < length; i++) {
		otp += digits[Math.floor(Math.random() * digits.length)];
	}
	return otp;
};

export const decryptText = async (plainText: string, hashText: string) => {
	return await bcrypt.compare(plainText, hashText);
};
