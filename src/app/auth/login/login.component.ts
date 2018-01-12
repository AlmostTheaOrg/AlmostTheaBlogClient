import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../AuthenticationService';
import { User } from '../../data/User';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	public user = { username: '', password: '' };

	constructor(private router: Router, private authService: AuthenticationService) { }

	public onSubmit() {
		this.authService.login(new User(this.user.username, this.user.password));
		this.router.navigateByUrl('/');
	}
}
