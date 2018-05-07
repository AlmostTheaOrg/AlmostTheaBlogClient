import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { IAppState } from '../data/store/IAppState';
import { ProjectService } from '../services';
import { AddProjectViewModel, EditProjectViewModel } from '../services/project.service';

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
	}

	getProjects() {
		this.projectService.all().then(projects => {
			this.ngRedux.dispatch({ type: GET_PROJECTS, projects });
		});
	}

	addProject(projectViewModel: AddProjectViewModel) {
		return this.projectService.add(projectViewModel).then(project => {
			this.ngRedux.dispatch({ type: ADD_PROJECT, project });
		});
	}

	getProject(name: string) {
		this.projectService.find(p => p.name === name).then(projects => {
			this.ngRedux.dispatch({ type: GET_PROJECT, project: projects[0] });
		});
	}

	editProject(editProjectViewModel: EditProjectViewModel) {
		return this.projectService.edit(editProjectViewModel)
			.then(project => {
				this.ngRedux.dispatch({ type: EDIT_PROJECT, project });
			});
	}

	deleteProject(projectId: string) {
		return this.projectService.delete(projectId).then((result: any) => {
			if (result.error) {
				return;
			}
			this.ngRedux.dispatch({ type: DELETE_PROJECT, id: projectId });
		});
	}

	addPhotoToProject(projectId: string, photo: File) {
		return this.projectService.addPhotoToProject(projectId, photo)
			.then(project => {
				this.ngRedux.dispatch({ type: EDIT_PROJECT, project });
			});
	}

	deletePhotoFromProject(projectId: string, photoId: string) {
		return this.projectService.deletePhotoFromProject(projectId, photoId)
			.then(project => {
				this.ngRedux.dispatch({ type: EDIT_PROJECT, project });
			});
	}
}
