import { Component, OnDestroy, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppActions } from '../../app.actions';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.css'],
	animations: [
		trigger('visibilityChanged', [
			state('shown', style({ opacity: 1 })),
			state('hidden', style({ opacity: 0 })),
			transition('* => *', animate('1s'))
		])
	]
})
export class NotificationComponent implements OnInit, OnDestroy {
	message: string;
	modalClass: string;
	visibility = 'hidden';

	@select('globalErrorMessage') globalErrorMessage: Observable<string>;

	private subscription: Subscription;

	constructor(private appActions: AppActions) { }

	error(message: string) {
		this.display(message, 'error');
	}

	success(message: string) {
		this.display(message, 'success');
	}

	close() {
		if (this.message) {
			this.visibility = 'hidden';
			this.appActions.clean();

			setTimeout(() => {
				this.message = '';
				this.modalClass = 'modal-content';
			}, 1000);
		}
	}

	ngOnInit() {
		this.subscription = this.globalErrorMessage.subscribe(message => {
			if (message) {
				this.error(message);
			}
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	private display(message: string, type: 'error' | 'success') {
		this.modalClass = 'modal-content ' + type;
		this.message = message;
		this.visibility = 'shown';

		setTimeout(() => {
			this.close();
		}, 4000);
	}
}
