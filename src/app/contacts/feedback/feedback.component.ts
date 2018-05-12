import { Component, OnDestroy, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Feedback } from '../../services/feedback.service';
import { FeedbackActions } from '../feedback.actions';

@Component({
	selector: 'app-feedback',
	templateUrl: './feedback.component.html',
	styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnDestroy {

	@select('feedbacks')
	public feedbacks: Observable<Feedback[]>;

	public sortedFeedbacks: Feedback[];
	public openedFeedback: Feedback;
	public selectedFeedbacksIds = new Set<string>();

	private subscription: Subscription;
	constructor(private feedbackActions: FeedbackActions) {
	}

	ngOnInit() {
		this.feedbackActions.getAll();

		this.subscription = this.feedbacks.pipe(tap(feedbacks => {
			this.sortedFeedbacks = new Array<Feedback>(...feedbacks);
			this.sortedFeedbacks.sort((a, b) => {
				return b.datePosted.getTime() - a.datePosted.getTime();
			});
		})).subscribe();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	view(feedback) {
		this.markAsRead(feedback);
		this.openedFeedback = feedback;
	}

	selectOrDeselect(feedback) {
		if (this.selectedFeedbacksIds.has(feedback.id)) {
			this.selectedFeedbacksIds.delete(feedback.id);
		} else {
			this.selectedFeedbacksIds.add(feedback.id);
		}
	}

	close() {
		this.openedFeedback = null;
	}

	delete() {
		if (this.openedFeedback && this.selectedFeedbacksIds.has(this.openedFeedback.id)) {
			this.close();
		}

		this.selectedFeedbacksIds.forEach(f => this.feedbackActions.delete(f));
		this.selectedFeedbacksIds.clear();
	}

	markAsRead(feedback: Feedback) {
		this.feedbackActions.markAsRead(feedback);
	}
}
