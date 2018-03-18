import { Component, EventEmitter, Output, Input, ViewChild, OnInit } from '@angular/core';
import { PortraitAddComponent, PortraitDetailsComponent, PortraitEditComponent, PortraitDeleteComponent } from '../index';

import { ModalComponent } from '../../modal/modal/modal.component';
import { ModalCreator } from '../../modal/modal/modal-creator';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { PortraitActions } from '../portrait.actions';
import { AuthActions } from '../../auth/auth.actions';
import { Portrait } from '../../services/portrait.service';

@Component({
	selector: 'app-portraits',
	templateUrl: './portraits.component.html',
	styleUrls: ['./portraits.component.css']
})
export class PortraitsComponent extends ModalCreator implements OnInit {
	@select('portraits')
	public portraits: Observable<Portrait[]>;

	@select('isAuthenticated')
	public isAuthenticated: Observable<boolean>;

	@ViewChild(ModalComponent)
	private readonly child;

	constructor(
		private imageRepository: PortraitActions,
		private authActions: AuthActions,
		private portraitActions: PortraitActions) {
		super();
	}

	ngOnInit(): void {
		this.portraitActions.getPortraits();
	}

	public getModalComponent() {
		return this.child;
	}

	show(image: Portrait) {
		this.open(PortraitDetailsComponent, { imageSrc: image.imageUrl });
	}

	add() {
		this.open(PortraitAddComponent, {});
	}

	edit(event: Event, portrait: Portrait) {
		event.stopPropagation();
		this.open(PortraitEditComponent, { id: portrait.id, name: portrait.name, imageUrl: portrait.imageUrl });
	}

	delete(event: Event, portrait: Portrait) {
		event.stopPropagation();
		this.open(PortraitDeleteComponent, { id: portrait.id, name: portrait.name });
	}
}
