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
import { ServicesModule } from './services/services.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ModalModule } from './modal/modal.module';

import { AppComponent } from './app.component';

import { IAppState } from './store/IAppState';
import { store } from './store/store';
import { environment } from '../environments/environment';
import { AuthActions } from './auth/auth.actions';
import { AppActions } from './app.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
	declarations: [
		AppComponent,
		NotFoundComponent
	],
	imports: [
		BrowserModule,
		HttpModule,
		NgReduxModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HomeModule,
		AboutModule,
		ContactsModule,
		ProjectsModule,
		PortraitsModule,
		AuthModule,
		ModalModule,
		ServicesModule,
		SharedModule
	],
	exports: [
		SharedModule
	],
	providers: [
		AuthActions,
		AppActions
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(private ngRedux: NgRedux<IAppState>) {
		this.ngRedux.provideStore(store);
	}
}
