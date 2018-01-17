import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/AuthenticationService';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	public shouldBeVisible = false;

	constructor(private authService: AuthenticationService) { }

	ngOnInit() {
	}

	public response() {
		this.shouldBeVisible = !this.shouldBeVisible;
	}

	get isLoggedIn() {
		return this.authService.isLogged;
	}
}
