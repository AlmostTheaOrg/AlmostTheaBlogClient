import { Component, OnInit } from '@angular/core';
import { AuthActions } from '../../auth/auth.actions';
import { select } from 'ng2-redux/lib/decorators/select';
import { Constants } from '../shared.constants';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	public shouldBeVisible = false;

	@select('isAuthenticated')
	public isAuthenticated;

	constructor(private authActions: AuthActions,
		public constants: Constants) { }

	ngOnInit() {
		this.authActions.isAuthenticated();
	}

	public response() {
		this.shouldBeVisible = !this.shouldBeVisible;
	}
}
