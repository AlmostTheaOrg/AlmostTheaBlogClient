import { Component, OnInit, Injector } from '@angular/core';
import { Project } from '../../data/models';
import { ProjectService } from '../../data/services/ProjectService';
import { Router } from '@angular/router';
import { ModalWindow } from '../../shared/modal/modal-window';

@Component({
	selector: 'app-project-delete',
	templateUrl: './project-delete.component.html',
})
export class ProjectDeleteComponent extends ModalWindow {
	public project: Project;

	constructor(injector: Injector,
		private projectService: ProjectService,
		private router: Router) {
		super(injector);
		this.project = injector.get('project');
	}

	onSubmit() {
		this.projectService.delete(this.project.getId());
		this.close();
		this.router.navigateByUrl('/projects');
	}
}
