import { Component, OnInit, Injector } from '@angular/core';
import { ModalWindow } from '../../modal/modal/modal-window';
import { ProjectActions } from '../project.actions';
import { AddProjectViewModel } from '../../services/project.service';
import { select } from 'ng2-redux';
import { SharedActions } from '../../shared/shared.actions';

@Component({
	selector: 'app-project-add',
	templateUrl: './project-add.component.html',
	styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent extends ModalWindow {
	public project: AddProjectViewModel = { name: '', thumbnail: null };
	public loading: boolean;

	constructor(injector: Injector,
		private projectActions: ProjectActions,
		private sharedActions: SharedActions) {
		super(injector);
	}

	onSubmit(form: HTMLFormElement) {
		this.project.thumbnail = form.value.file[0];
		this.loading = true;
		this.projectActions.addProject(this.project)
			.then(() => {
				this.loading = false;
				this.sharedActions.showInfo('Project was added successfully!');
				this.close();
			})
			.catch(error => {
				this.loading = false;
				this.sharedActions.showWarning('Project add failed!');
				this.close();
			});
	}
}
