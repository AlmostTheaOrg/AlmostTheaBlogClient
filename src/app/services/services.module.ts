import { NgModule } from '@angular/core';
import { AuthenticationService, PortraitService, ProjectService, UtilService } from './';
import { RecaptchaValidator, HttpRecaptchaValidatorService } from './recaptcha-validator.service';
import { environment } from '../../environments/environment';
import { CryptoService } from './crypto.service';
import { ApplicationStorageService } from './application-storage.service';
import { HttpService } from './http.service';
import { RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaModule } from 'ng-recaptcha';
import { CommonModule } from '@angular/common';
import { FeedbackService } from './feedback.service';
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
		HttpService,
		{
			provide: RECAPTCHA_SETTINGS,
			useValue: settings,
		},
		{
			provide: RecaptchaValidator,
			useClass: HttpRecaptchaValidatorService
		},
		PortraitService,
		ProjectService,
		FeedbackService
	]
})
export class ServicesModule {
}
