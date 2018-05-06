import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AuthenticationService } from './authentication.service';
import { UtilService } from './util.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {
	constructor(private httpService: HttpService,
		private authenticationService: AuthenticationService,
		private utilService: UtilService) {
	}

	all(): Promise<Project[]> {
		return this.httpService.get('project/all').toPromise()
			.then(res => res.json())
			.then(portraits => portraits.map(this.mapAsProject));
	}

	add(addProjectViewModel: AddProjectViewModel): Promise<Project> {
		return this.authenticationService.user().then(user => {
			const formData: FormData = new FormData();
			formData.set('name', addProjectViewModel.name);
			formData.append('thumbnail', addProjectViewModel.thumbnail, addProjectViewModel.thumbnail.name);

			const headers = this.utilService.getAuthorizationHeaders(user);

			return this.mapToProject(this.httpService.post('project/add', formData, headers));
		});
	}

	find(predicate: (project: Project) => boolean) {
		return this.all().then(projects => {
			return projects.filter(predicate);
		});
	}

	addPhotoToProject(projectId: string, photo: File): Promise<Project> {
		return this.authenticationService.user().then(user => {
			const formData: FormData = new FormData();
			formData.append('photo', photo, photo.name);

			const headers = this.utilService.getAuthorizationHeaders(user);

			return this.mapToProject(this.httpService.put(`project/add/${projectId}/photo`, formData, headers));
		});
	}

	deletePhotoFromProject(projectId: string, photoId: string) {
		return this.authenticationService.user().then(user => {
			const headers = this.utilService.getAuthorizationHeaders(user);

			return this.mapToProject(this.httpService.put(`project/delete/${projectId}/photo/${photoId}`, {}, headers));
		});
	}

	edit(project: EditProjectViewModel) {
		return this.authenticationService.user().then(user => {
			const formData: FormData = new FormData();
			formData.set('name', project.name);
			if (project.thumbnail) {
				formData.append('thumbnail', project.thumbnail, project.thumbnail.name);
			}

			const headers = this.utilService.getAuthorizationHeaders(user);

			return this.mapToProject(this.httpService.put(`project/edit/${project.id}`, formData, headers));
		});
	}

	delete(projectId: string) {
		return this.authenticationService.user().then(user => {
			const headers = this.utilService.getAuthorizationHeaders(user);
			return this.httpService.delete(`project/delete/${projectId}`, headers).toPromise();
		});
	}

	private mapToProject(response: Observable<any>): Promise<Project> {
		return response
			.toPromise()
			.then(res => res.json())
			.then(project => {
				return this.mapAsProject(project);
			});
	}

	private mapAsProject(project) {
		return {
			id: project._id,
			name: project.name,
			thumbnailUrl: project.thumbnail.url,
			photos: project.photos ? project.photos.map(p => {
				return { id: p._id, imageUrl: p.url };
			}) : []
		};
	}
}

export interface EditProjectViewModel extends AddProjectViewModel {
	id: string;
}

export interface AddProjectViewModel {
	name: string;
	thumbnail: File;
}

export interface Project {
	id: string;
	name: string;
	thumbnailUrl: string;
	photos: Photo[];
}

export interface Photo {
	id: string;
	imageUrl: string;
}
