import { Component, OnInit } from '@angular/core';
import { FeedbackActions } from '../feedback.actions';
import { Feedback } from '../../services/feedback.service';
import { Router } from '@angular/router';

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

	constructor(private feedbackActions: FeedbackActions,
		private router: Router) { }

	resolved(str) {
	}

	onSubmit() {
		this.loading = true;
		this.feedbackActions.add(this.feedback).then(() => {
			this.loading = false;
			console.log('loading is done');
			this.router.navigateByUrl('/');
			// TODO: Display thankful message.
		}).catch(err => {
			this.loading = false;
			// TODO: Display error message.
		});
	}
}
