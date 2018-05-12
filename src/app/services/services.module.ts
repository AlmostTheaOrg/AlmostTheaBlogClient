import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RECAPTCHA_SETTINGS, RecaptchaModule } from 'ng-recaptcha';
import { environment } from '../../environments/environment';
import { AuthenticationService, PortraitService, ProjectService, UtilService } from './';
import { ApplicationStorageService } from './application-storage.service';
import { AuthenticationGuardService } from './authentication.guard.service';
import { CryptoService } from './crypto.service';
import { FeedbackService } from './feedback.service';
import { HttpService } from './http.service';
import { HttpRecaptchaValidatorService } from './recaptcha-validator.service';
const settings = { siteKey: environment.recaptcha_site_key };

@NgModule({
	imports: [
		CommonModule,
		RecaptchaModule.forRoot()
	],
	providers: [
		CryptoService,
		ApplicationStorageService,
		UtilService,
		AuthenticationService,
		AuthenticationGuardService,
		HttpService,
		{
			provide: RECAPTCHA_SETTINGS,
			useValue: settings,
		},
		HttpRecaptchaValidatorService,
		PortraitService,
		ProjectService,
		FeedbackService
	]
})
export class ServicesModule {
}
