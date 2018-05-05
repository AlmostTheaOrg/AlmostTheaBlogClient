import { Component, OnInit } from '@angular/core';
import { Constants } from '../../shared/shared.constants';
import { SharedActions } from '../../shared/shared.actions';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	constructor(public constants: Constants, public sharedActions: SharedActions) {
	 }
}
