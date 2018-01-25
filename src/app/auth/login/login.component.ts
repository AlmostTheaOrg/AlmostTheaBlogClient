import { Component, OnInit } from '@angular/core';
import { User } from '../../data/models';
import { Router } from '@angular/router';
import { AuthActions } from '../auth.actions';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	public user = { username: '', password: '' };

	constructor(private router: Router, private authActions: AuthActions) { }

	public onSubmit() {
		this.authActions.login(new User(this.user.username, this.user.password));
		this.router.navigateByUrl('/');
	}
}
