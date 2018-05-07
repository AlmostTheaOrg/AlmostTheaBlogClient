import { Component, EventEmitter, Output, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { PortraitAddComponent, PortraitDetailsComponent, PortraitEditComponent, PortraitDeleteComponent } from '../index';

import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalCreator } from '../../shared/modal/modal-creator';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { PortraitActions } from '../portrait.actions';
import { AuthActions } from '../../auth/auth.actions';
import { Portrait } from '../../services/portrait.service';
import { Subscription } from 'rxjs/Subscription';
import { SharedActions } from '../../shared/shared.actions';

@Component({
	selector: 'app-portraits',
	templateUrl: './portraits.component.html',
	styleUrls: ['./portraits.component.css']
})
export class PortraitsComponent extends ModalCreator implements OnInit, OnDestroy {
	@select('portraits')
	public portraits: Observable<Portrait[]>;

	@select('isAuthenticated')
	public isAuthenticated: Observable<boolean>;

	public loading: boolean;

	@ViewChild(ModalComponent)
	private readonly child;
	private _portraits: Portrait[];
	private subscription: Subscription;

	constructor(
		private authActions: AuthActions,
		private portraitActions: PortraitActions) {
		super();
	}

	ngOnInit() {
		this.portraitActions.getPortraits();
		this.loading = true;
		this.subscription = this.portraits.skip(1)
			.do((data) => this.loading = !data)
			.do(portraits => this._portraits = portraits)
			.subscribe();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	getModalComponent() {
		return this.child;
	}

	show(portrait: Portrait) {
		this.open(PortraitDetailsComponent, { portraits: this._portraits, portrait });
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
