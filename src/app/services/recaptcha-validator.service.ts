import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpService } from './http.service';

@Injectable()
export class HttpRecaptchaValidatorService {
	constructor(private httpService: HttpService) {
	}

	validate(response: string) {
		return this.httpService.post('validate', { response: response })
			.map(res => res.json())
			.map(res => res.success)
			.toPromise();
	}
}
