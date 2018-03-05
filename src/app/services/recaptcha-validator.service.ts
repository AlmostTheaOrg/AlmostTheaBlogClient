import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Headers } from '@angular/http';

export const RECAPTCHA_VALIDATION: InjectionToken<string> = new InjectionToken('RECAPTCHA_VALIDATION');

export interface IRecaptchaValidator {
	validate(token: string): Promise<boolean>;
}

export abstract class RecaptchaValidator implements IRecaptchaValidator {
	abstract validate(token: string): Promise<boolean>;
}

@Injectable()
export class HttpRecaptchaValidatorService implements RecaptchaValidator {
	constructor(private http: Http, @Inject(RECAPTCHA_VALIDATION) private validationUrl: string) {
	}

	validate(token: string) {
		return this.http.post(this.validationUrl + 'validate', { response: token })
			.map(res => res.json())
			.map(res => {
				if (!res.success) {
					return false;
				}

				return true;
			})
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
