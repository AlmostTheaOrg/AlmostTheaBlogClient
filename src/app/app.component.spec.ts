import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AuthActions } from './auth/auth.actions';
import { NgReduxModule } from 'ng2-redux';

import { APP_BASE_HREF } from '@angular/common';
import { AuthenticationService } from './services';
import { HttpService } from './services/http.service';
import { Http } from '@angular/http';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				SharedModule,
				RouterModule.forRoot([])
			],
			declarations: [
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
