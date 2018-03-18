import { User } from '../data/models';
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
	getAuthorizationHeaders(user: User) {
		return new Headers({
			'Authorization': 'JWT ' + user.token,
			'Accept': 'application/json'
		});
	}
}
