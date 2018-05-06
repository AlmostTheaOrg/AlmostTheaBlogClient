import { Component, OnInit, Injector } from '@angular/core';
import { ModalWindow } from '../../modal/modal/modal-window';
import { ProjectActions } from '../project.actions';
import { SharedActions } from '../../shared/shared.actions';
import { Router } from '@angular/router';

@Component({
	selector: 'app-project-edit',
	templateUrl: './project-edit.component.html',
	styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent extends ModalWindow {
	public project = { id: '', name: '', file: null, thumbnailUrl: '' };
	public loading: boolean;

	constructor(injector: Injector,
		private router: Router,
		private projectActions: ProjectActions,
		private sharedActions: SharedActions) {
		super(injector);
		this.project.id = injector.get('id');
		this.project.name = injector.get('name');
		this.project.thumbnailUrl = injector.get('thumbnailUrl');
	}

	onSubmit() {
		this.projectActions.editProject({
			id: this.project.id,
			name: this.project.name,
			thumbnail: this.project.file ? this.project.file[0] : null
		})
			.then(() => {
				this.complete();
				this.router.navigateByUrl('projects/' + this.project.name);
				this.sharedActions.showInfo('Project was edited successfully!');
			})
			.catch(() => {
				this.complete();
				this.sharedActions.showDanger('Project edit failed!');
			});
	}

	private complete() {
		this.loading = true;
		this.close();
	}
}
