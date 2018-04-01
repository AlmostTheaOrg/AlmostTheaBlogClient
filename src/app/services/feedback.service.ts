import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AuthenticationService, UtilService } from '.';

@Injectable()
export class FeedbackService {
	constructor(private httpService: HttpService,
		private authenticationService: AuthenticationService,
		private utilService: UtilService) {
	}

	public add(feedback: AddFeedbackBindingModel) {
		return this.httpService.post('feedback/add', feedback)
			.toPromise()
			.then(res => res.json() as SimpleResponse);
	}

	public markAsRead(feedback: Feedback) {
		return this.authenticationService.user().then(user => {
			const headers = this.utilService.getAuthorizationHeaders(user);

			feedback = Object.assign({}, feedback, { isRead: true });
			return this.httpService.put(`feedback/edit/${feedback.id}`, feedback, headers)
				.toPromise()
				.then(res => res.json() as SimpleResponse);
		});
	}

	public all() {
		return this.authenticationService.user().then(user => {
			const headers = this.utilService.getAuthorizationHeaders(user);

			return this.httpService.get('feedback/all', headers)
				.toPromise()
				.then(res => res.json() as Array<any>)
				.then(feedbacks => feedbacks.map(f => {
					f.id = f._id;
					f.datePosted = new Date(f.datePosted);
					return f;
				}) as Feedback[]);
		});
	}

	public delete(id: string) {
		return this.authenticationService.user().then(user => {
			const headers = this.utilService.getAuthorizationHeaders(user);

			return this.httpService.delete(`feedback/delete/${id}`, headers)
				.toPromise()
				.then(res => res.json() as SimpleResponse);
		});
	}
}

export interface AddFeedbackBindingModel {
	name: string;
	email?: string;
	content: string;
}

export interface Feedback extends AddFeedbackBindingModel {
	id: string;
	isRead: boolean;
	datePosted: Date;
}

export interface SimpleResponse {
	success: boolean;
	message: string;
}
