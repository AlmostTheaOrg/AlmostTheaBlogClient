import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/IAppState';
import { GLOBAL_ERROR } from '../../store/reducer';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationActions {
	constructor(private ngRedux: NgRedux<IAppState>) { }

	cleanMessage() {
		this.ngRedux.dispatch({ type: GLOBAL_ERROR, message: '' });
	}
}
