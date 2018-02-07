import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Headers } from '@angular/http';

export const RECAPTCHA_VALIDATION: InjectionToken<string> = new InjectionToken('RECAPTCHA_VALIDATION');

@Injectable()
export class RecaptchaValidator {
	constructor(private http: Http, @Inject(RECAPTCHA_VALIDATION) private validationUrl: string) {
	}

	validate(token: string) {
		return this.http.post(this.validationUrl + 'validate', { response: token })
			.map(res => res.json())
			.map(res => {
				if (!res.success) {
					return { valid: false };
				}

				return { valid: true };
			})
			.toPromise();
	}
}
