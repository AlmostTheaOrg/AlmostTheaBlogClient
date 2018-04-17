import { Component, OnInit, Injector } from '@angular/core';
import { PortraitActions } from '../portrait.actions';
import { SharedActions } from '../../shared/shared.actions';

@Component({
	selector: 'app-portrait-delete',
	templateUrl: './portrait-delete.component.html',
	styleUrls: ['./portrait-delete.component.css']
})
export class PortraitDeleteComponent {
	image;
	loading: boolean;

	private close;

	constructor(private injector: Injector,
		private portraitActions: PortraitActions,
		private sharedActions: SharedActions) {
		this.image = {
			id: this.injector.get('id'),
			name: this.injector.get('name')
		};

		this.close = this.injector.get('close');
	}

	onSubmit(event: Event) {
		event.preventDefault();

		this.loading = true;
		this.portraitActions.deletePortrait(this.image.id)
			.then(success => {
				this.loading = true;
				this.sharedActions.showInfo('Portrait was deleted successfully!');
				this.close();
			})
			.catch(error => {
				this.sharedActions.showWarning('Portrait delete failed!');
				this.loading = false;
			});
	}
}
