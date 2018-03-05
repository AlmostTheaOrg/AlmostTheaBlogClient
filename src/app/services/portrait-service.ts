import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Headers } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { User } from '../data/models';

@Injectable()
export class PortraitService {
	constructor(private httpService: HttpService,
		private authenticationService: AuthenticationService) {
	}

	all() {
		return this.httpService.get('portrait/all').toPromise()
			.then(res => res.json())
			.then(portraits => portraits.map(p => {
				return { id: p._id, name: p.name, imageUrl: p.image.url };
			}));
	}

	add(portrait: AddPortraitViewModel) {
		return this.authenticationService.user().then(user => {
			const formData: FormData = new FormData();
			formData.append('image', portrait.image, portrait.image.name);
			formData.set('name', portrait.name);

			/** No need to include Content-Type in Angular 4 */
			const headers = this.getAuthorizationHeaders(user);

			return this.httpService.post('portrait/add', formData, headers)
				.toPromise()
				.then(res => res.json())
				.then(p => {
					return { _id: p._id, name: p.name, imageUrl: p.image.url };
				});
		});
	}



	edit(editPortraitViewModel: EditPortraitViewModel) {
		const body = new FormData();
		if (editPortraitViewModel.image) {
			body.append('image', editPortraitViewModel.image, editPortraitViewModel.image.name);
		}

		body.set('name', editPortraitViewModel.name);

		return this.authenticationService.user().then(user => {
			const headers = this.getAuthorizationHeaders(user);
			return this.httpService.put('portrait/edit/' + editPortraitViewModel.id, body, headers)
				.toPromise()
				.then(res => res.json())
				.then(result => {
					if (result.success) {
						const portrait = result.portrait;
						return { id: portrait._id, name: portrait.name, imageUrl: portrait.image.url };
					}
				});
		});
	}

	delete(id) {
		return this.authenticationService.user().then(user => {
			const headers = this.getAuthorizationHeaders(user);

			return this.httpService.delete('portrait/delete/' + id, headers)
				.toPromise()
				.then(res => res.json());
		});
	}

	private getAuthorizationHeaders(user: User) {
		return new Headers({
			'Authorization': 'JWT ' + user.token,
			'Accept': 'application/json'
		});
	}
}

export interface AddPortraitViewModel {
	name: string;
	image: File;
}

export interface EditPortraitViewModel {
	id: string;
	name: string;
	image?: File;
}
