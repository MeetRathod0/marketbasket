export interface IResponse {
	status?: number;
	responseCode?: number;
	message?: string;
	data?: unknown;
	error?: unknown;
}
