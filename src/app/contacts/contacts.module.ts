import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ContactsComponent, FeedbackComponent]
})
export class ContactsModule { }
