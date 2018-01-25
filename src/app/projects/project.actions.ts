import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { IAppState } from '../store/IAppState';
import { ProjectService } from '../data/services';
import { Project } from '../data/models/Project';

export const GET_PROJECTS = 'PROJECT/ALL';
export const ADD_PROJECT = 'PROJECT/ADD';
export const GET_PROJECT = 'PROJECT/GET';
export const EDIT_PROJECT = 'PROJECT/EDIT';
export const DELETE_PROJECT = 'PROJECT/DELETE';

@Injectable()
export class ProjectActions {
	constructor(private ngRedux: NgRedux<IAppState>, private projectService: ProjectService) {
		// TODO: User HTTP backend service.
	}

	getProjects() {
		this.ngRedux.dispatch({ type: GET_PROJECTS, projects: this.projectService.all() });
	}

	addProject(project: Project) {
		this.ngRedux.dispatch({ type: ADD_PROJECT, project });
	}

	getProject(name: string) {
		const project: Project = this.projectService.find(p => p.getName() === name);
		this.ngRedux.dispatch({ type: GET_PROJECT, project });
	}

	editProject(id: string, project: Project) {
		this.ngRedux.dispatch({ type: EDIT_PROJECT, id, project });
	}

	deleteProject(id: string) {
		this.ngRedux.dispatch({ type: DELETE_PROJECT, id });
	}
}
