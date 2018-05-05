import { Component, OnInit } from '@angular/core';
import { FeedbackActions } from '../feedback.actions';
import { Feedback } from '../../services/feedback.service';
import { Router } from '@angular/router';
import { RecaptchaValidator } from '../../services/recaptcha-validator.service';
import { SharedActions } from '../../shared/shared.actions';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
	feedback: {
		name: string,
		email?: string,
		captcha?: '',
		content: string
	} = { name: '', content: '' };
	loading: boolean;
	isRecaptchaValid: boolean;

	constructor(private feedbackActions: FeedbackActions,
		private sharedActions: SharedActions,
		private router: Router,
		private recaptchaValidator: RecaptchaValidator) { }

	resolved(response) {
		this.recaptchaValidator.validate(response)
			.then((result) => {
				this.isRecaptchaValid = result;
			});
	}

	onSubmit() {
		this.loading = true;
		this.feedbackActions.add(this.feedback).then(() => {
			this.loading = false;
			this.router.navigateByUrl('/');
			this.sharedActions.showSuccess('Thank you for your feedback!');
		}).catch(err => {
			this.loading = false;
			this.sharedActions.showDanger('There was an error submitting your feedback. Please try again later!');
		});
	}
}
