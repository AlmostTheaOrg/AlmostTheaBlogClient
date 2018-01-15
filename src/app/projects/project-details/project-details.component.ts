import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../auth/AuthenticationService';

@Component({
	selector: 'app-project-details',
	templateUrl: './project-details.component.html',
	styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
	private projectName: string;
	public photos: Array<any> = [
		{

			imageSrc: 'https://images.pexels.com/photos/34950/pexels-photo.jpg?w=940&h=650&auto=compress&cs=tinysrgb'
		},
		{
			imageSrc: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/ls-sample6.jpg'
		},
		{

			imageSrc: 'https://images.pexels.com/photos/798575/pexels-photo-798575.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
		},
		{

			imageSrc: 'https://images.pexels.com/photos/796611/pexels-photo-796611.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
		},
		{
			imageSrc: 'https://images.pexels.com/photos/773736/pexels-photo-773736.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
		},
		{
			imageSrc: 'https://images.pexels.com/photos/59599/pexels-photo-59599.jpeg?w=1280&h=851&auto=compress&cs=tinysrgb'
		}
	];

	public selected = { imageSrc: '', previous: null, next: null };

	constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) {
		this.route.params.subscribe(params => {
			this.projectName = params['name'];

			if (this.projectName === 'not-found') {
				this.router.navigateByUrl('/projects');
			}
		});

		let previous: { imageSrc: string } = null;
		this.photos.forEach(p => {
			if (previous !== null) {
				p.previous = previous;
				p.previous.next = p;
			}

			previous = p;
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
}
