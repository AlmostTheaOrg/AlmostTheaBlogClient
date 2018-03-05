import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../data/models';
import { Router } from '@angular/router';
import { AuthActions } from '../auth.actions';
import { RecaptchaValidator } from '../../services/recaptcha-validator.service';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
	public user = { username: '', password: '', captcha: '' };
	public isRecaptchaValid = false;

	private isLoggingIn = false;
	private subscription: Subscription;

	@select('isAuthenticated')
	private isAuthenticated: Observable<boolean>;

	constructor(
		private router: Router,
		private recaptchaValidator: RecaptchaValidator,
		private authActions: AuthActions) { }

	ngOnInit(): void {
		if (this.isAuthenticated) {
			this.subscription = this.isAuthenticated.subscribe(isAuthenticated => {
				if (this.isLoggingIn && isAuthenticated) {
					this.router.navigateByUrl('/');
				}
			});
		}
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	public onSubmit() {
		this.isLoggingIn = true;
		this.authActions.login({ username: this.user.username, password: this.user.password });
	}

	resolve(captchaResponse: string) {
		this.user.captcha = '';

		this.recaptchaValidator.validate(captchaResponse)
			.then(isValid => {
				this.isRecaptchaValid = isValid;
			});
	}
}
