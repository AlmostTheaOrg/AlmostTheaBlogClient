import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable, Subscription } from 'rxjs';
import { skip, tap } from 'rxjs/operators';
import { AuthActions } from '../../auth/auth.actions';
import { Portrait } from '../../services/portrait.service';
import { ModalCreator } from '../../shared/modal/modal-creator';
import { ModalComponent } from '../../shared/modal/modal.component';
import { PortraitAddComponent, PortraitDeleteComponent, PortraitDetailsComponent, PortraitEditComponent } from '../index';
import { PortraitActions } from '../portrait.actions';

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
		this.subscription = this.portraits
			.pipe(skip(1))
			.pipe(tap((data) => this.loading = !data))
			.pipe(tap(portraits => this._portraits = portraits))
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
