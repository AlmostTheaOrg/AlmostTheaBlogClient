import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../data/store/IAppState';
import { AddFeedbackBindingModel, Feedback, FeedbackService } from '../services/feedback.service';

export const FEEDBACK_ALL = 'FEEDBACK_ALL';
export const FEEDBACK_ADD = 'FEEDBACK_ADD';
export const FEEDBACK_MARK = 'FEEDBACK_MARK';
export const FEEDBACK_DELETE = 'FEEDBACK_DELETE';

@Injectable()
export class FeedbackActions {
	constructor(private ngRedux: NgRedux<IAppState>,
		private feedbackService: FeedbackService) { }

	getAll() {
		this.feedbackService.all().then(feedbacks => {
			this.ngRedux.dispatch({ type: FEEDBACK_ALL, feedbacks });
		});
	}

	delete(id: string) {
		this.feedbackService.delete(id).then((res) => {
			if (res.success) {
				this.ngRedux.dispatch({ type: FEEDBACK_DELETE, id: id });
			}
		});
	}

	add(feedback: AddFeedbackBindingModel) {
		return this.feedbackService.add(feedback).then((res: any) => {
			if (res.success) {
				this.ngRedux.dispatch({ type: FEEDBACK_ADD, feedback: res.feedback });
			}

			return res;
		});
	}

	markAsRead(feedback: Feedback) {
		this.feedbackService.markAsRead(feedback).then(() => {
			this.ngRedux.dispatch({ type: FEEDBACK_MARK, id: feedback.id });
		});
	}
}
