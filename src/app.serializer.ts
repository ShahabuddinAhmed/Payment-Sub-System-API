export class AppSerializer {
	statusCode: number;
	message: string;
	data: any;
	errors: any;

	constructor(statusCode: number, message: string, data: any, errors: any) {
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
		this.errors = errors;
	}
}