import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './store/IAppState';

export const GLOBAL_ERROR = 'GLOBAL_ERROR';
export const CLEAN = 'CLEAN';

@Injectable()
export class AppActions {
	constructor(private ngRedux: NgRedux<IAppState>) {
	}

	globalError(error: string) {
		this.ngRedux.dispatch({ type: GLOBAL_ERROR, error });
	}

	clean() {
		this.ngRedux.dispatch({ type: CLEAN, error: '' });
	}
}
