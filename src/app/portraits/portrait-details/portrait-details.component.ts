import { Component, OnInit, Injector } from '@angular/core';

@Component({
	selector: 'app-portrait-details',
	templateUrl: './portrait-details.component.html',
	styleUrls: ['./portrait-details.component.css']
})
export class PortraitDetailsComponent {
	public readonly imageSrc: string;

	constructor(private injector: Injector) {
		this.imageSrc = this.injector.get('imageSrc');
	}
}
