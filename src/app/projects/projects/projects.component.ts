import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/AuthenticationService';
import { Project } from '../../data/models/Project';
import { ProjectService } from '../../data/services/ProjectService';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
	public projects: Array<Project>;

	constructor(private authService: AuthenticationService, private projectService: ProjectService) {
		this.projects = projectService.all();
	}

	get isLoggedIn() {
		return this.authService.isLogged;
	}

	ngOnInit() {
	}
}
