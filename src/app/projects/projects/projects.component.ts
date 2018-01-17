import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { AuthenticationService } from '../../auth/AuthenticationService';
import { Project } from '../../data/models/Project';
import { ProjectService } from '../../data/services/ProjectService';
import { ProjectAddComponent } from '../project-add/project-add.component';
import { ModalCreator } from '../../shared/modal/modal-creator';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent extends ModalCreator {
	public projects: Array<Project>;

	@ViewChild(forwardRef(() => ModalComponent))
	private readonly child;

	constructor(private authService: AuthenticationService,
		private projectService: ProjectService) {
		super();
		this.projects = projectService.all();
	}

	get isLoggedIn() {
		return this.authService.isLogged;
	}

	addProject() {
		this.open(ProjectAddComponent, {});
	}

	public getModalComponent() {
		return this.child;
	}
}
