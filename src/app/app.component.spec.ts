import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AuthActions } from './auth/auth.actions';
import { NgReduxModule } from 'ng2-redux';
import { AuthenticationService } from './data/services';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterModule,
				FormsModule,
				SharedModule,
				NgReduxModule,
				RouterModule.forRoot([])
			],
			declarations: [
				AppComponent
			],
			providers: [
				AuthActions,
				AuthenticationService,
				{provide: APP_BASE_HREF, useValue: '/'}
			]

		}).compileComponents();
	}));

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
