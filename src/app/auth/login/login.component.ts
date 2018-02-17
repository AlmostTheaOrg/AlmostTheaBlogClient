import { Component, OnInit } from '@angular/core';
import { User } from '../../data/models';
import { Router } from '@angular/router';
import { AuthActions } from '../auth.actions';
import { RecaptchaValidator } from '../../utilities/recaptcha-validator';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	public user = { username: '', password: '', captcha: '' };
	public isRecaptchaValid = false;

	constructor(
		private router: Router,
		private recaptchaValidator: RecaptchaValidator,
		private authActions: AuthActions) { }

	public onSubmit() {
		this.authActions.login(new User(this.user.username, this.user.password));
		this.router.navigateByUrl('/');
	}

	resolved(captchaResponse: string) {
		this.user.captcha = '';

		this.recaptchaValidator.validate(captchaResponse)
			.then(result => {
				this.isRecaptchaValid = result.valid;
			})
			.catch(error => {
				console.log(error);

				// TODO: Remove this one.
				this.isRecaptchaValid = true;
			});
	}
}
