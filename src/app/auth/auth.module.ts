import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RecaptchaModule.forRoot(),
		RecaptchaFormsModule,
	],
	declarations: [LoginComponent]
})
export class AuthModule { }
