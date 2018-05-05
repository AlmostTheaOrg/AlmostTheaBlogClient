import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/IAppState';

export const NOTIFICATION_MESSAGE = 'NOTIFICATION_MESSAGE';

@Injectable()
export class SharedActions {

	constructor(private ngRedux: NgRedux<IAppState>) {

	}

	showMessage(type: NotificationType, content: string, timeout: number = 5000) {
		this.ngRedux.dispatch({ type: NOTIFICATION_MESSAGE, message: content, notificationType: type });

		setTimeout(() => {
			this.ngRedux.dispatch({ type: NOTIFICATION_MESSAGE, message: '', notificationType: null });
		}, timeout);
	}

	showSuccess(content: string) {
		this.showMessage(NotificationType.Success, content);
	}

	showInfo(content: string) {
		this.showMessage(NotificationType.Info, content);
	}

	showWarning(content: string) {
		this.showMessage(NotificationType.Warning, content);
	}

	showDanger(content: string) {
		this.showMessage(NotificationType.Danger, content);
	}
}

export enum NotificationType {
	Info,
	Success,
	Warning,
	Danger,
}

export class NotificationMessage {
	message: string;
	type: NotificationType;
}
