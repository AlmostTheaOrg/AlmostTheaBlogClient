import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthActions } from '../../auth/auth.actions';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
	constructor(private router: Router, private authActions: AuthActions) { }

	@select('isAuthenticated')
	public isAuthenticated: Observable<boolean>;

	ngOnInit() {
		this.authActions.isAuthenticated();
	}

	logout() {
		this.authActions.logout();
		this.router.navigateByUrl('/');
	}
}
