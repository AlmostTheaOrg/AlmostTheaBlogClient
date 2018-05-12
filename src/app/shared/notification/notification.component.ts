import { Component, OnDestroy, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable, Subscription } from 'rxjs';
import { NotificationMessage, NotificationType } from '../shared.actions';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
	message: string;
	modalClass = 'notify';

	@select('notificationMessage')
	notificationMessage: Observable<NotificationMessage>;

	private subscription: Subscription;

	constructor() { }

	danger(message: string) {
		this.display(message, 'danger');
	}

	success(message: string) {
		this.display(message, 'success');
	}

	info(message: string) {
		this.display(message, 'info');
	}

	warning(message: string) {
		this.display(message, 'warning');
	}

	close() {
		this.modalClass = 'notify';
	}

	ngOnInit() {
		this.subscription = this.notificationMessage.subscribe(message => {
			if (message.message) {
				switch (message.type) {
					case NotificationType.Success:
						this.success(message.message);
						break;
					case NotificationType.Danger:
						this.danger(message.message);
						break;
					case NotificationType.Info:
						this.info(message.message);
						break;
					case NotificationType.Warning:
						this.warning(message.message);
						break;
				}
			} else {
				this.close();
			}
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	private display(message: string, type: 'danger' | 'success' | 'warning' | 'info') {
		this.modalClass = `notify notify-${type} is-active`;
		this.message = message;
	}
}
