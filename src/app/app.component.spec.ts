import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthActions } from './auth/auth.actions';
import { AuthenticationService } from './services';
import { HttpService } from './services/http.service';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterModule.forRoot([])
			],
			declarations: [
				AppHeaderMockComponent,
				AppFooterMockComponent,
				AppNotificationMockComponent,
				AppRouterOutletMockComponent,
				AppComponent
			],
			providers: [
				{ provide: AuthActions, useValue: {} },
				{ provide: AuthenticationService, useValue: {} },
				{ provide: APP_BASE_HREF, useValue: '/' },
				{ provide: HttpService, useValue: {} }
			]

		}).compileComponents();
	}));

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});

@Component({
	selector: 'app-header',
	template: ''
})
class AppHeaderMockComponent {
}

@Component({
	selector: 'app-footer',
	template: ''
})
class AppFooterMockComponent {
}

@Component({
	selector: 'app-notification',
	template: ''
})
class AppNotificationMockComponent {
}

@Component({
	selector: 'router-outlet',
	template: ''
})
class AppRouterOutletMockComponent {
}
