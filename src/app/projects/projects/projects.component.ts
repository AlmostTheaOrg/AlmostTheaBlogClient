import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
	public projects: Array<{ name: string, pictures: number, thumb: string }> = [
		{
			name: 'Nature',
			pictures: 14,
			thumb: 'https://images.pexels.com/photos/34950/pexels-photo.jpg?w=940&h=650&auto=compress&cs=tinysrgb'
		},
		{
			name: 'Civil',
			pictures: 8,
			thumb: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/ls-sample6.jpg'
		},
		{
			name: 'Animals',
			pictures: 11,
			thumb: 'https://images.pexels.com/photos/798575/pexels-photo-798575.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
		},
		{
			name: 'Coffee',
			pictures: 3,
			thumb: 'https://images.pexels.com/photos/796611/pexels-photo-796611.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
		},
		{
			name: 'Casual',
			pictures: 5,
			thumb: 'https://images.pexels.com/photos/773736/pexels-photo-773736.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
		}

	];
	constructor() { }

	ngOnInit() {
	}
}
