import { Component } from '@angular/core';
import { Constants } from '../../shared/shared.constants';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

	constructor(public constants: Constants) { }
}
