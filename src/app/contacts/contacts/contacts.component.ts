import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
	public shouldBeVisible = false;

	constructor() { }

	ngOnInit() {
	}

	public response () {
		this.shouldBeVisible = !this.shouldBeVisible;
	}
}
