import { Component, OnInit, ViewChild } from '@angular/core';
import { FeedbackActions } from '../feedback.actions';
import { Feedback } from '../../services/feedback.service';
import { Router } from '@angular/router';
import { HttpRecaptchaValidatorService } from '../../services/recaptcha-validator.service';
import { SharedActions } from '../../shared/shared.actions';
import { Form } from '@angular/forms';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
	feedback: {
		name: string;
		email?: string;
		captcha?: string;
		content: string;
	} = { name: '', content: '' };
	loading: boolean;
	isRecaptchaValid: boolean;

	@ViewChild('contactUs')
	contactUs: HTMLFormElement;

	constructor(private feedbackActions: FeedbackActions,
		private sharedActions: SharedActions,
		private router: Router,
		private recaptchaValidator: HttpRecaptchaValidatorService) { }

	resolved(response) {
		this.recaptchaValidator.validate(response).then(result => {
			this.isRecaptchaValid = result;
		});
	}

	validateName() {
		const isNameValid = /^[a-zA-Z]{3,30}$/.test(this.feedback.name);
		this.markErrorIfAny(isNameValid, 'name');
	}

	validateEmail() {
		const isEmailValid = /^(.+)@(.+){2,}\.(.+){2,}$/.test(this.feedback.email);
		this.markErrorIfAny(isEmailValid, 'email');
	}

	validateMessage() {
		const isContentValid = /^[\w!\,\\\/:\.\-\?\s\"]{10,500}$/.test(this.feedback.content);
		this.markErrorIfAny(isContentValid, 'message');
	}

	onSubmit() {
		this.loading = true;
		this.feedbackActions
			.add(this.feedback)
			.then(() => {
				this.loading = false;
				this.router.navigateByUrl('/');
				this.sharedActions.showSuccess('Thank you for your feedback!');
			})
			.catch(err => {
				this.loading = false;
				this.sharedActions.showDanger(
					'There was an error submitting your feedback. Please try again later!'
				);
			});
	}

	isNameCharacterAllowed(event: KeyboardEvent) {
		return this.isAlphabet(event.keyCode) || event.keyCode === 32 || event.keyCode === 9;
	}

	isEmailCharacterAllowed(event: KeyboardEvent) {
		return this.isAlphanumeric(event.keyCode) || event.keyCode === 190 || event.keyCode === 9;
	}

	private isAlphabet(key: number) {
		return ((key >= 65 && key <= 90) || key === 8);
	}

	private isAlphanumeric(key: number) {
		return this.isAlphabet(key) || (key >= 48 && key <= 57);
	}

	private markErrorIfAny(isValid: boolean, control: string) {
		if (!isValid) {
			this.contactUs.form.controls[control].setErrors({ 'incorrect': true });
		} else {
			this.contactUs.form.controls[control].setErrors(null);
		}
	}
}
