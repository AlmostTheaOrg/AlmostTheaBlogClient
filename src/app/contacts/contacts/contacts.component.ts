import { Component, OnInit } from '@angular/core';
import { FeedbackActions } from '../feedback.actions';
import { Feedback } from '../../services/feedback.service';

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

	constructor(private feedbackActions: FeedbackActions) { }

	resolved(str) {
	}

	onSubmit() {
		this.feedbackActions.add(this.feedback);
	}
}
