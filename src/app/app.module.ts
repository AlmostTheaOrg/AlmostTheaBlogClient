import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { PortraitsModule } from './portraits/portraits.module';
import { ProjectsModule } from './projects/projects.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ImageService, ProjectService } from './data/services';
import { AuthenticationService } from './auth/AuthenticationService';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpModule } from '@angular/http';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { IAppState } from './store/IAppState';
import { store } from './store/store';
import { PortraitActions } from './portraits/portrait.action';

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
		AuthModule
	],
	exports: [],
	providers: [ImageService, AuthenticationService, ProjectService, PortraitActions],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(private ngRedux: NgRedux<IAppState>) {
		this.ngRedux.provideStore(store);
	}
}
