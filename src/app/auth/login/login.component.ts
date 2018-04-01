import { Component } from '@angular/core';
import { User } from '../../data/models';
import { Router } from '@angular/router';
import { AuthActions } from '../auth.actions';
import { RecaptchaValidator } from '../../services/recaptcha-validator.service';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SharedActions } from '../../shared/shared.actions';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	public user = { username: '', password: '', captcha: '' };
	public isRecaptchaValid = false;

	private isLoggingIn = false;

	@select('isAuthenticated')
	private isAuthenticated: Observable<boolean>;

	constructor(
		private router: Router,
		private recaptchaValidator: RecaptchaValidator,
		private authActions: AuthActions,
		private sharedActions: SharedActions) { }

	public onSubmit(loginForm: HTMLFormElement) {
		this.isLoggingIn = true;
		this.authActions.login({ username: this.user.username, password: this.user.password })
			.then(res => {
				if (!res) {
					this.sharedActions.showDanger('Connection to server failed! Are you connected to Internet?');
				} else if (!res.success) {
					this.sharedActions.showDanger(res.message);
				} else {
					this.router.navigateByUrl('/');
					this.sharedActions.showSuccess('Login successful!');
				}

				loginForm.reset();
			})
			.catch(error => {
				this.sharedActions.showDanger(error.message);
			});
	}

	resolve(captchaResponse: string) {
		this.user.captcha = '';

		this.recaptchaValidator.validate(captchaResponse)
			.then(isValid => {
				this.isRecaptchaValid = isValid;
			});
	}
}
