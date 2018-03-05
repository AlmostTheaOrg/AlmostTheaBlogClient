import { User } from '../data/models';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ApplicationStorageService } from './application-storage.service';

@Injectable()
export class AuthenticationService {
	private static readonly USER_KEY = 'user';

	constructor(private httpService: HttpService,
		private applicationStorage: ApplicationStorageService) {
	}

	public login(user: User): Promise<any> {
		return this.httpService.post('login', user)
		.toPromise()
		.then(result => result.json())
		.then(result => {
				if (result.success) {
					this.applicationStorage.save(AuthenticationService.USER_KEY, result);
				}

				return result;
			})
			.catch(error => {
				console.log(error);
			});
	}

	public logout(): Promise<any> {
		const logout = new Promise((resolve, reject) => {
			this.isLogged()
				.then(isLoggedIn => {
					if (!isLoggedIn) {
						reject({ message: 'You should log in first!' });
						return;
					}

					this.applicationStorage.clear();
					resolve({ success: true });
				});
		});

		return logout;
	}

	public isLogged(): Promise<boolean> {
		const isLoggedIn = new Promise<boolean>((resolve, reject) => {
			this.user().then(user => {
				resolve(user !== null);
			});
		});

		return isLoggedIn;
	}

	public user(): Promise<User> {
		const user = new Promise<User>((resolve, reject) => {
			const savedUser = this.applicationStorage.get(AuthenticationService.USER_KEY);
			resolve(savedUser);
		});

		return user;
	}
}
