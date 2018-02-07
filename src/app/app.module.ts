import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgRedux, NgReduxModule } from 'ng2-redux';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { PortraitsModule } from './portraits/portraits.module';
import { ProjectsModule } from './projects/projects.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { ImageService, ProjectService, AuthenticationService } from './data/services';
import { IAppState } from './store/IAppState';
import { store } from './store/store';
import { AuthActions } from './auth/auth.actions';
import { ModalModule } from './modal/modal.module';
import { RecaptchaValidator, RECAPTCHA_VALIDATION } from './utilities/recaptcha-validator';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [AppComponent, NotFoundComponent],
	imports: [
		BrowserModule,
		HttpModule,
		NgReduxModule,
		AppRoutingModule,
		HomeModule,
		AboutModule,
		ContactsModule,
		ProjectsModule,
		SharedModule,
		PortraitsModule,
		AuthModule,
		ModalModule
	],
	exports: [],
	providers: [
		ImageService,
		AuthenticationService,
		ProjectService,
		AuthActions,
		RecaptchaValidator,
		{
			provide: RECAPTCHA_SETTINGS,
			useValue: { siteKey: environment.recaptcha_site_key } as RecaptchaSettings,
		},
		{
			provide: RECAPTCHA_VALIDATION,
			useValue: environment.backend_url,
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(private ngRedux: NgRedux<IAppState>) {
		this.ngRedux.provideStore(store);
	}
}
