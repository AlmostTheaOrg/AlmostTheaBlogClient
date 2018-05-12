import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpRecaptchaValidatorService {
	constructor(private httpService: HttpService) {
	}

	validate(response: string) {
		return this.httpService.post('validate', { response: response })
			.pipe(map(res => res.json()))
			.pipe(map(res => res.success))
			.toPromise();
	}
}
