import { User } from '../models';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
	public login(user: User): void {
		// TODO: Validate.
		this.save(user.username, user.password);
	}

	public logout(): void {
		// TODO: Validate.
		this.save();
	}

	public get isLogged(): boolean {
		return this.user !== null;
	}

	public get user(): User {
		const username = window.sessionStorage.getItem('username');
		if (username === undefined || username === null || username === '') {
			return null;
		}

		const password = window.sessionStorage.getItem('password');
		return new User(username, password);
	}

	private save(username: string = '', password: string = '') {
		window.sessionStorage.setItem('username', username);
		window.sessionStorage.setItem('password', password);
	}
}
