import { NgRedux } from 'ng2-redux';
import { AuthenticationService } from '../data/services';
import { IAppState } from '../store/IAppState';
import { User } from '../data/models/User';
import { Injectable } from '@angular/core';

export const IS_AUTHENTICATED = 'user/IS_AUTHENTICATED';
export const USER_GET = 'user/GET';
export const USER_LOGIN = 'user/LOGIN';
export const USER_LOGOUT = 'user/LOGOUT';

@Injectable()
export class AuthActions {
	constructor(private ngRedux: NgRedux<IAppState>, private authService: AuthenticationService) {
		// TODO: User HTTP backend service.
	}

	isAuthenticated() {
		this.ngRedux.dispatch({ type: IS_AUTHENTICATED, isAuthenticated: this.authService.isLogged });
	}

	getCurrentUser() {
		this.ngRedux.dispatch({ type: USER_GET, user: this.authService.user });
	}

	login(user: User) {
		this.authService.login(user);
		this.ngRedux.dispatch({ type: USER_LOGIN, user: user, isAuthenticated: true });
	}

	logout() {
		this.authService.logout();
		this.ngRedux.dispatch({ type: USER_LOGOUT, user: null, isAuthenticated: false });
	}
}
