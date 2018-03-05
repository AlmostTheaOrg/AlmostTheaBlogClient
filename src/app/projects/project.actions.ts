import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { IAppState } from '../store/IAppState';
import { Project, Image } from '../data/models';
import { ProjectService } from '../services';

export const GET_PROJECTS = 'PROJECT/ALL';
export const ADD_PROJECT = 'PROJECT/ADD';
export const GET_PROJECT = 'PROJECT/GET';
export const EDIT_PROJECT = 'PROJECT/EDIT';
export const ADD_PROJECT_IMAGE = 'PROJECT/EDIT';
export const REMOVE_PROJECT_IMAGE = 'PROJECT/EDIT';
export const DELETE_PROJECT = 'PROJECT/DELETE';

@Injectable()
export class ProjectActions {
	constructor(private ngRedux: NgRedux<IAppState>, private projectService: ProjectService) {
		// TODO: User HTTP backend service.
	}

	getProjects() {
		this.ngRedux.dispatch({ type: GET_PROJECTS, projects: [] });
	}

	addProject(project: any) {
		this.ngRedux.dispatch({ type: ADD_PROJECT, project });
	}

	getProject(name: string) {
		const project: Project = new Project('a', new Image('', '')); // this.projectService.find(p => p.getName() === name);
		this.ngRedux.dispatch({ type: GET_PROJECT, project });
	}

	editProject(id: string, project: any) {
		this.ngRedux.dispatch({ type: EDIT_PROJECT, id, project });
	}

	deleteProject(id: string) {
		this.ngRedux.dispatch({ type: DELETE_PROJECT, id });
	}

	addProjectImage(id: string, image: File) {
		this.ngRedux.dispatch({ type: ADD_PROJECT_IMAGE, id, image });
	}

	deleteProjectImage(projectId: string, imageId: string) {
		this.ngRedux.dispatch({ type: ADD_PROJECT_IMAGE, projectId, imageId });
	}
}
