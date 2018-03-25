import { Component } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


@Component({
	selector: 'spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
	@select('shouldShowSpinner')
	showSpinner: Observable<boolean>;
}
