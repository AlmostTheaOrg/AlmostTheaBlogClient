import { Injectable } from '@angular/core';
import { IAppState } from '../store/IAppState';
import { NgRedux } from 'ng2-redux';
import { PortraitService } from '../services';
import { AddPortraitViewModel, EditPortraitViewModel } from '../services/portrait.service';
import { Portrait } from '../data/models/Portrait';

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
		this.portraitsService.add(portraitViewModel).then((portrait: any) => {
			this.ngRedux.dispatch({ type: ADD_PORTRAIT, portrait });
		});
	}

	editPortrait(portraitEditViewModel: EditPortraitViewModel) {
		this.portraitsService.edit(portraitEditViewModel).then(portrait => {
			this.ngRedux.dispatch({ type: EDIT_PORTRAIT, portrait });
		});
	}

	deletePortrait(id: string) {
		this.portraitsService.delete(id).then((result) => {
			if (result.success) {
				this.ngRedux.dispatch({ type: DELETE_PORTRAIT, id });
			}
		});
	}
}
