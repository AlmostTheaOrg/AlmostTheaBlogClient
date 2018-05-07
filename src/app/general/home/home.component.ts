import { Component } from '@angular/core';
import { Constants } from '../../shared/shared.constants';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	constructor(public constants: Constants) {
	}
}
