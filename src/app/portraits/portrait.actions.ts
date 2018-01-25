import { Injectable } from '@angular/core';
import { IAppState } from '../store/IAppState';
import { NgRedux } from 'ng2-redux';
import { ImageService } from '../data/services';
import { Image } from '../data/models';

export const GET_PORTRAITS = 'portrait/ALL';
export const ADD_PORTRAIT = 'portrait/ADD';
export const EDIT_PORTRAIT = 'portrait/EDIT';
export const DELETE_PORTRAIT = 'portrait/DELETE';

@Injectable()
export class PortraitActions {
	constructor(private ngRedux: NgRedux<IAppState>, private portraitsService: ImageService) {
		// TODO: User HTTP backend service.
	}

	getPortraits() {
		this.ngRedux.dispatch({ type: GET_PORTRAITS, portraits: this.portraitsService.all() });
	}

	addPortrait(portrait: Image) {
		this.ngRedux.dispatch({ type: ADD_PORTRAIT, portrait });
	}

	editPortrait(id: string, portrait: Image) {
		portrait.setId(id);
		this.ngRedux.dispatch({ type: EDIT_PORTRAIT, portrait });
	}

	deletePortrait(id: string) {
		this.ngRedux.dispatch({ type: DELETE_PORTRAIT, id });
	}
}
