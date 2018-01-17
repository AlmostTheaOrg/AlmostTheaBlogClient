import { Component, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { ImageService } from '../../data/services';
import { Image } from '../../data/models';
import { ImageAddComponent, ImageDetailsComponent, ImageEditComponent, ImageDeleteComponent } from '../index';

import { ModalComponent } from '../../shared/modal/modal.component';
import { AuthenticationService } from '../../auth/AuthenticationService';
import { ModalCreator } from '../../shared/modal/modal-creator';
@Component({
	selector: 'app-portraits',
	templateUrl: './portraits.component.html',
	styleUrls: ['./portraits.component.css']
})
export class PortraitsComponent extends ModalCreator {
	@ViewChild(ModalComponent)
	private readonly child;

	constructor(private imageRepository: ImageService, private authService: AuthenticationService) {
		super();
	}

	public getModalComponent() {
		return this.child;
	}

	get images(): Image[] {
		return this.imageRepository.all();
	}

	get isLoggedIn() {
		return this.authService.isLogged;
	}

	show(image: Image) {
		this.open(ImageDetailsComponent, { imageSrc: image.getImageSrc() });
	}

	add() {
		this.open(ImageAddComponent, {});
	}

	edit(event: Event, image: Image) {
		event.stopPropagation();

		this.open(ImageEditComponent, { id: image.getId(), name: image.getName(), imageSrc: image.getImageSrc() });
	}

	delete(event: Event, image: Image) {
		event.stopPropagation();

		this.open(ImageDeleteComponent, { id: image.getId(), name: image.getName() });
	}
}
