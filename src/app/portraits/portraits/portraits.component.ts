import { Component, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { ImageService } from '../../data/services';
import { Image } from '../../data/models';
import { ImageAddComponent, ImageDetailsComponent, ImageEditComponent, ImageDeleteComponent } from '../index';

import { ModalComponent } from '../../shared/modal/modal.component';
import { AuthenticationService } from '../../auth/AuthenticationService';
import { ModalCreator } from '../../shared/modal/modal-creator';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { PortraitActions } from '../portrait.action';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
	selector: 'app-portraits',
	templateUrl: './portraits.component.html',
	styleUrls: ['./portraits.component.css']
})
export class PortraitsComponent extends ModalCreator implements OnInit {
	@select('portraits')
	private portraits: Observable<Image[]>;

	@ViewChild(ModalComponent)
	private readonly child;

	constructor(
		private imageRepository: PortraitActions,
		private authService: AuthenticationService,
		private portraitActions: PortraitActions) {
		super();
	}

	ngOnInit(): void {
		this.portraitActions.getPortraits();
	}

	public getModalComponent() {
		return this.child;
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
