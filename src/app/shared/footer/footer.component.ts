import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/AuthenticationService';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent {
	constructor(private authService: AuthenticationService) { }

	get isLoggedIn(): boolean {
		return this.authService.isLogged;
	}
}
