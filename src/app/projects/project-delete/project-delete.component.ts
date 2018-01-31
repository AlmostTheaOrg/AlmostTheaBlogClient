import { Component, OnInit, Injector } from '@angular/core';
import { Project } from '../../data/models';
import { Router } from '@angular/router';
import { ModalWindow } from '../../modal/modal/modal-window';
import { ProjectActions } from '../project.actions';

@Component({
	selector: 'app-project-delete',
	templateUrl: './project-delete.component.html',
})
export class ProjectDeleteComponent extends ModalWindow {
	public project: Project;

	constructor(injector: Injector,
		private projectActions: ProjectActions,
		private router: Router) {
		super(injector);
		this.project = injector.get('project');
	}

	onSubmit() {
		this.projectActions.deleteProject(this.project.getId());
		this.close();
		this.router.navigateByUrl('/projects');
	}
}
