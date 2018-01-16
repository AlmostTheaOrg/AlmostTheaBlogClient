import { DynamicService } from './DynamicService';
import { Image } from '../models';
import { Injectable } from '@angular/core';

@Injectable()
export class ImageService extends DynamicService<Image> {

	constructor() {
		super();

		this.add(new Image('Biktor', 'assets/images/portrait-1.jpg'));
		this.add(new Image('Goshy', 'assets/images/portrait-2.jpg'));
		this.add(new Image('Elly', 'assets/images/portrait-3.jpg'));
		this.add(new Image('Doggie', 'http://i.huffpost.com/gen/749263/original.jpg'));
	}
}
