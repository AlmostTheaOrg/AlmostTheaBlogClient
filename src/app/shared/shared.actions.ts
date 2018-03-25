import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/IAppState';

export const SHOULD_SHOW_SPINNER = 'SHOULD_SHOW_SPINNER';

@Injectable()
export class SharedActions {

	constructor(private ngRedux: NgRedux<IAppState>) {

	}

	showSpinner() {
		this.ngRedux.dispatch({ type: SHOULD_SHOW_SPINNER, shouldShowSpinner: true });
	}

	hideSpinner() {
		this.ngRedux.dispatch({ type: SHOULD_SHOW_SPINNER, shouldShowSpinner: false });
	}
}
