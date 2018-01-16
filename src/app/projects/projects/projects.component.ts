import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/AuthenticationService';
import { Project } from '../../data/models/Project';
import { ProjectService } from '../../data/services/ProjectService';
import { ProjectAddComponent } from '../project-add/project-add.component';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
	public projects: Array<Project>;
	private componentData;

	constructor(private authService: AuthenticationService, private projectService: ProjectService) {
		this.projects = projectService.all();
	}

	get isLoggedIn() {
		return this.authService.isLogged;
	}

	addProject() {
		this.componentData = {
			component: ProjectAddComponent,
			inputs: {}
		};
	}
}
