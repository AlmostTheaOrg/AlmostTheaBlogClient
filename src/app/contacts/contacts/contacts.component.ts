import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
	contact: {
		name: string,
		email?: string,
		captcha?: '',
		message: string
	} = { name: '', message: '' };

	public resolved(str) {
	}

	public onSubmit() {

	}
}
