import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
	public feedback: { captcha: ''};
	constructor() { }

	ngOnInit() {
	}

	public resolved (str) {
	}
}
