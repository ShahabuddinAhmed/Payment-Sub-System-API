import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  	getHello(): string {
    	return 'Welcome To Payment Sub System API!';
  	}
}