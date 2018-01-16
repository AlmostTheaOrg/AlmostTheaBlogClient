import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../auth/AuthenticationService';
import { ProjectService } from '../../data/services';
import { Project, Image } from '../../data/models';
import { ProjectPhotoListViewModel } from '../../data/view-models/ProjectPhotoListViewModel';
@Component({
	selector: 'app-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
	private project: Project;
	public photos: Array<ProjectPhotoListViewModel> = [];

	public selected = { imageSrc: '', previous: null, next: null };

	constructor(private route: ActivatedRoute,
		private router: Router,
		private authService: AuthenticationService,
		private projectService: ProjectService) {
		this.route.params.subscribe(params => {
			const projectName = params['name'];
			this.project = this.projectService.find(p => p.getName() === projectName);
			if (this.project === null) {
				this.router.navigateByUrl('/projects');
				return;
			}

			this.photos = this.getPhotos();
		});
	}

	get isLoggedIn() {
		return this.authService.isLogged;
	}

	select(photo) {
		this.selected = photo;
	}

	showPrevious() {
		if (this.selected.imageSrc === '') {
			return;
		}

		if (this.selected.previous) {
			this.selected = this.selected.previous;
		}
	}

	showNext() {
		if (this.selected.imageSrc === '') {
			return;
		}

		if (this.selected.next) {
			this.selected = this.selected.next;
		}
	}

	deletePhoto(event: Event, photo: { imageSrc: string }) {
		event.stopPropagation();
		const index = this.project.getImages().findIndex(p => p.getImageSrc() === photo.imageSrc);
		const images = this.project.getImages();
		images.splice(index, 1);
		this.project = new Project(this.project.getName(), this.project.getThumbnail(), images);

		this.projectService.edit(this.project.getId(), this.project);
		this.photos = this.getPhotos();

		if (this.selected.imageSrc === photo.imageSrc) {
			this.selected = { imageSrc: '', previous: null, next: null };
		}
	}

	// Will return all images for a project (in their initial order).
	private getPhotos(): Array<ProjectPhotoListViewModel> {
		const photos = [];
		let previous: { imageSrc: string; } = null;

		for (const projectPhoto of this.project.getImages()) {
			const photoViewModel: ProjectPhotoListViewModel = { imageSrc: projectPhoto.getImageSrc() };
			if (previous !== null) {
				photoViewModel.previous = previous;
				photoViewModel.previous.next = photoViewModel;
			}

			photos.push(photoViewModel);
			previous = photoViewModel;
		}

		return photos;
	}
}
