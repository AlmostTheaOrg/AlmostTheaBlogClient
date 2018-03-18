import { Component, OnInit, Injector } from '@angular/core';
import { ModalWindow } from '../../modal/modal/modal-window';
import { ProjectActions } from '../project.actions';

@Component({
	selector: 'app-project-edit',
	templateUrl: './project-edit.component.html',
	styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent extends ModalWindow {
	public project = { id: '', name: '', file: null };

	constructor(injector: Injector,
		private projectActions: ProjectActions) {
		super(injector);
		this.project.id = injector.get('id');
		this.project.name = injector.get('name');
	}

	onSubmit() {
		this.projectActions.editProject({
			id: this.project.id,
			name: this.project.name,
			thumbnail: this.project.file ? this.project.file[0] : null
		});
		this.close();
	}
}
