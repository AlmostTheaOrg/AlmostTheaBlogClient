import { NgRedux } from 'ng2-redux';
import { AuthenticationService } from '../services';
import { IAppState } from '../store/IAppState';
import { User } from '../data/models/User';
import { Injectable } from '@angular/core';

export const IS_AUTHENTICATED = 'user/IS_AUTHENTICATED';
export const USER_GET = 'user/GET';
export const USER_LOGIN = 'user/LOGIN';
export const USER_LOGOUT = 'user/LOGOUT';

@Injectable()
export class AuthActions {
	constructor(private ngRedux: NgRedux<IAppState>,
		private authService: AuthenticationService) {
	}

	isAuthenticated() {
		this.authService.isLogged().then(isAuthenticated => {
			this.ngRedux.dispatch({ type: IS_AUTHENTICATED, isAuthenticated });
		});
	}

	getCurrentUser() {
		this.authService.user().then(user => {
			this.ngRedux.dispatch({ type: USER_GET, user });
		});
	}

	login(user: User) {
		return this.authService.login(user)
			.then(result => {
				if (!result) {
					this.ngRedux.dispatch({ type: USER_LOGIN, user: user, isAuthenticated: true });
				}

				return result;
			})
			.catch(res => res.json());
	}

	logout() {
		this.authService.logout().then(() => {
			this.ngRedux.dispatch({ type: USER_LOGOUT, user: null, isAuthenticated: false });
		});
	}
}
