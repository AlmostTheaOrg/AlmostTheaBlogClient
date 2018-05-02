import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuardService implements CanActivate {
	constructor(public authService: AuthenticationService, public router: Router) { }
	canActivate(): Promise<boolean> {
		return this.authService.isLogged().then(isLoggedIn => {
			if (!isLoggedIn) {
				this.router.navigate(['login']);
			}

			return isLoggedIn;
		});
	}
}
