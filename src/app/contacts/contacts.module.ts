import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { FeedbackActions } from './feedback.actions';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RecaptchaModule.forRoot(),
		RecaptchaFormsModule,
	],
	declarations: [ContactsComponent, FeedbackComponent],
	providers: [
		FeedbackActions
	]
})
export class ContactsModule { }
