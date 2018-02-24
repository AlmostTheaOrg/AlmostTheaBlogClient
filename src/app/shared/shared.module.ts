import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FileValidator } from './directives/file-input.directive';
import { FileValueAccessorDirective } from './directives/file-control-value-accessor.directive';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		HeaderComponent,
		FooterComponent,
		FileValidator,
		FileValueAccessorDirective
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		FileValidator,
		FileValueAccessorDirective
	]
})
export class SharedModule { }
