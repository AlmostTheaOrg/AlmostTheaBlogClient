import { Component, OnInit, OnDestroy } from '@angular/core';
import { Feedback } from '../../services/feeedback.service';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';
import { FeedbackActions } from '../feedback.actions';
import { Subscription } from 'rxjs/Subscription';

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

		this.subscription = this.feedbacks.do(feedbacks => {
			this.sortedFeedbacks = new Array<Feedback>(...feedbacks);
			this.sortedFeedbacks.sort((a, b) => {
				return b.datePosted.getTime() - a.datePosted.getTime();
			});
		}).subscribe();
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
	}

	markAsRead(feedback: Feedback) {
		this.feedbackActions.markAsRead(feedback);
	}
}
