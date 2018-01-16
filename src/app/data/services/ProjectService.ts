import { DynamicService } from './DynamicService';
import { Project } from '../models';
import { Injectable } from '@angular/core';
import { Image } from '../models/Image';

@Injectable()
export class ProjectService extends DynamicService<Project> {
	constructor() {
		super();
		const photos = [
			new Image('nature', 'https://images.pexels.com/photos/34950/pexels-photo.jpg?w=940&h=650&auto=compress&cs=tinysrgb'),
			new Image('civil', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/ls-sample6.jpg'),
			new Image('animals', 'https://images.pexels.com/photos/798575/pexels-photo-798575.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'),
			new Image('coffee', 'https://images.pexels.com/photos/796611/pexels-photo-796611.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'),
			new Image('casual', 'https://images.pexels.com/photos/773736/pexels-photo-773736.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'),
		];

		this.add(new Project('Nature', photos[0], photos));
		this.add(new Project('Civil', photos[1], photos));
		this.add(new Project('Animals', photos[2], photos));
		this.add(new Project('Coffee', photos[3], photos));
		this.add(new Project('Casual', photos[4], photos));
	}
}
