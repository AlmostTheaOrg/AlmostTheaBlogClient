import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FileValidator } from './directives/file-input.directive';
import { FileValueAccessorDirective } from './directives/file-control-value-accessor.directive';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SharedActions } from './shared.actions';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		BrowserAnimationsModule
	],
	declarations: [
		HeaderComponent,
		FooterComponent,
		NotificationComponent,
		FileValidator,
		FileValueAccessorDirective,
		SpinnerComponent
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		NotificationComponent,
		FileValidator,
		FileValueAccessorDirective,
		SpinnerComponent
	],
	providers: [
		SharedActions
	]
})
export class SharedModule { }
