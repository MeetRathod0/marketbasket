export const responseCodes = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
};

export const responseMessages = {
	FETCH_SUCCESS: (key: string) => `${key} record(s) fetched successfully.`,
	FETCH_ERROR: (key: string) => `Failed to fetch ${key} record(s).`,

	CREATE_SUCCESS: (key: string) => `${key} record(s) created successfully.`,
	CREATE_ERROR: (key: string) => `Failed to create ${key} record(s).`,

	UPDATE_SUCCESS: (key: string) => `${key} record(s) updated successfully.`,
	UPDATE_ERROR: (key: string) => `Failed to update ${key} record(s).`,

	DELETE_SUCCESS: (key: string) => `${key} record(s) deleted successfully.`,
	DELETE_ERROR: (key: string) => `Failed to delete ${key} record(s).`,

	VALIDATION_ERROR: (key: string) => `Validation error: ${key}.`,
	UNAUTHORIZED: () => `Unauthorized access.`,
	FORBIDDEN: () => `Forbidden access.`,
	NOT_FOUND: (key: string) => `${key} not found.`,
	SERVER_ERROR: () => `Internal server error. Please try again later.`,

	LOGIN_SUCCESS: () => `Login successful.`,
	LOGIN_ERROR: () => `Invalid username or password.`,

	LOGOUT_SUCCESS: () => `Logout successful.`,

	PASSWORD_RESET_SUCCESS: () => `Password reset successfully.`,
	PASSWORD_RESET_ERROR: () => `Failed to reset password.`,

	TOKEN_EXPIRED: () => `Session expired. Please log in again.`,
	TOKEN_INVALID: () => `Invalid token provided.`,

	PERMISSION_DENIED: () => `Permission denied.`,

	CONNECTION_ERROR: () =>
		`Connection error. Please check your internet connection.`,

	OPERATION_SUCCESS: () => `Operation completed successfully.`,
	OPERATION_ERROR: () => `Operation failed. Please try again.`,

	RULES_GENERATED: () => `Rules generated successfully.`,
	RULES_GENERATION_ERROR: () => `Failed to generate rules.`,

	INVALID_USER: () => `Invalid user.`,
	OTP_SENT_SUCCESSFULLY: () => `OTP sent successfully.`,
	OTP_SENT_ERROR: () => `Failed to send OTP.`,

	OTP_EXPIRED: () => `OTP is expired.`,
	OTP_NOT_MATCHED: () => `OTP is not matched.`,
	OTP_MATCHED: () => `OTP matched successfully.`,
};
