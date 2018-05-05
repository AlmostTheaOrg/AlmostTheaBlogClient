import { Component } from '@angular/core';
import { Constants } from '../../shared/shared.constants';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.css']
})
export class AboutComponent {

	constructor(public constants: Constants) { }
}
