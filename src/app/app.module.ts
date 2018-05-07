import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgRedux, NgReduxModule } from 'ng2-redux';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { PortraitsModule } from './portraits/portraits.module';
import { ProjectsModule } from './projects/projects.module';
import { ServicesModule } from './services/services.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';

import { IAppState } from './data/store/IAppState';
import { store } from './data/store/store';
import { environment } from '../environments/environment';
import { AuthActions } from './auth/auth.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { GeneralModule } from './general/general.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		HttpModule,
		NgReduxModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ContactsModule,
		ProjectsModule,
		PortraitsModule,
		AuthModule,
		ServicesModule,
		SharedModule,
		GeneralModule
	],
	exports: [
		SharedModule
	],
	providers: [
		AuthActions,
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(private ngRedux: NgRedux<IAppState>) {
		this.ngRedux.provideStore(store);
	}
}
