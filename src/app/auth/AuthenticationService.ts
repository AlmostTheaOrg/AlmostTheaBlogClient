import { User } from '../data/User';

export class AuthenticationService {
	private currentUser: User;

	public login(user: User): void {
		this.currentUser = user;
	}

	public logout(): void {
		this.currentUser = null;
	}

	public get isLogged(): boolean {
		return this.user !== null;
	}

	public get user(): User {
		return this.currentUser;
	}
}
