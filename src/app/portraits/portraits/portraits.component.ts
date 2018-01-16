import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../../data/services';
import { Image } from '../../data/models';
import { ImageAddComponent, ImageDetailsComponent, ImageEditComponent, ImageDeleteComponent } from '../index';

import { DynamicComponent } from '../dynamic/dynamic.component';
import { AuthenticationService } from '../../auth/AuthenticationService';
@Component({
	selector: 'app-portraits',
	templateUrl: './portraits.component.html',
	styleUrls: ['./portraits.component.css']
})
export class PortraitsComponent implements OnInit, OnDestroy {
	private category = 'portraits';
	private routeChangeSubscription: any;

	private readonly empty = '';

	private closed = 'lightbox-target';
	private opened = this.closed + ' selected';
	private focused = false;
	public componentData: Object;
	@ViewChild(DynamicComponent) private readonly child;

	public readonly box = {
		class: 'lightbox-target',
		imageSrc: this.empty,
		portrait: { id: '0', name: this.empty },
		view: this.empty
	};

	constructor(
		private route: ActivatedRoute,
		private imageRepository: ImageService,
		private authService: AuthenticationService
	) { }

	ngOnInit() {
		this.routeChangeSubscription = this.route.params.subscribe(params => {
			this.category = params['category'];
		});
	}

	ngOnDestroy() {
		this.routeChangeSubscription.unsubscribe();
	}

	@Input()
	get class(): Object {
		return this.box;
	}

	get images(): Image[] {
		return this.imageRepository.all();
	}

	get isLoggedIn() {
		return this.authService.isLogged;
	}

	public open() {
		this.box.class = this.opened;
	}

	show(image: Image) {
		this.open();

		this.componentData = {
			component: ImageDetailsComponent,
			inputs: { imageSrc: image.getImageSrc() }
		};
	}

	public close() {
		this.box.class = this.closed;
		this.child.destroy();
	}

	add() {
		this.open();

		this.componentData = {
			component: ImageAddComponent,
			inputs: {
				close: this.close.bind(this)
			}
		};
	}

	edit(event: Event, image: Image) {
		this.open();
		event.stopPropagation();

		this.componentData = {
			component: ImageEditComponent,
			inputs: {
				id: image.getId(),
				name: image.getName(),
				imageSrc: image.getImageSrc(),
				close: this.close.bind(this)
			}
		};
	}

	delete(event: Event, image: Image) {
		this.open();
		event.stopPropagation();

		this.componentData = {
			component: ImageDeleteComponent,
			inputs: {
				id: image.getId(),
				name: image.getName(),
				close: this.close.bind(this)
			}
		};
	}
}
