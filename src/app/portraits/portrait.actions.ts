import { Injectable } from '@angular/core';
import { IAppState } from '../store/IAppState';
import { NgRedux } from 'ng2-redux';
import { PortraitService } from '../services';
import { AddPortraitViewModel, EditPortraitViewModel, Portrait } from '../services/portrait.service';

export const GET_PORTRAITS = 'portrait/ALL';
export const ADD_PORTRAIT = 'portrait/ADD';
export const EDIT_PORTRAIT = 'portrait/EDIT';
export const DELETE_PORTRAIT = 'portrait/DELETE';

@Injectable()
export class PortraitActions {
	constructor(private ngRedux: NgRedux<IAppState>,
		private portraitsService: PortraitService) {
	}

	getPortraits() {
		this.portraitsService.all().then((portraits: Portrait[]) => {
			this.ngRedux.dispatch({ type: GET_PORTRAITS, portraits: portraits });
		});
	}

	addPortrait(portraitViewModel: AddPortraitViewModel) {
		return this.portraitsService.add(portraitViewModel).then((portrait: Portrait) => {
			this.ngRedux.dispatch({ type: ADD_PORTRAIT, portrait });
			return portrait;
		});
	}

	editPortrait(portraitEditViewModel: EditPortraitViewModel) {
		return this.portraitsService.edit(portraitEditViewModel).then((portrait: Portrait) => {
			this.ngRedux.dispatch({ type: EDIT_PORTRAIT, portrait });
			return portrait;
		});
	}

	deletePortrait(id: string) {
		return this.portraitsService.delete(id).then((result) => {
			if (result.success) {
				this.ngRedux.dispatch({ type: DELETE_PORTRAIT, id });
			}

			return !!result.success;
		});
	}
}
