import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/AuthenticationService';
import { Router } from '@angular/router';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent {
	constructor(private router: Router, private authService: AuthenticationService) { }

	get isLoggedIn(): boolean {
		return this.authService.isLogged;
	}

	logout() {
		this.authService.logout();
		this.router.navigateByUrl('/');
	}
}
