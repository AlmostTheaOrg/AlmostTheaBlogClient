import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

export interface IRecaptchaValidator {
	validate(token: string): Promise<boolean>;
}

export abstract class RecaptchaValidator implements IRecaptchaValidator {
	abstract validate(token: string): Promise<boolean>;
}

@Injectable()
export class HttpRecaptchaValidatorService implements RecaptchaValidator {
	constructor(private httpService: HttpService) {
	}

	validate(response: string) {
		return this.httpService.post('validate', { response: response })
			.pipe(map(res => res.json()))
			.pipe(map(res => res.success))
			.toPromise();
	}
}

export class DummyRecaptchaValidatorService implements RecaptchaValidator {
	validate(token: string): Promise<boolean> {
		return new Promise((resolve) => {
			resolve(true);
		});
	}
}
