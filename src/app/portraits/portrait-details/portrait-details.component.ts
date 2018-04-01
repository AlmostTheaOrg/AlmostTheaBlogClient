import { Component, OnInit, Injector, HostListener } from '@angular/core';
import { Portrait } from '../../services/portrait.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-portrait-details',
	templateUrl: './portrait-details.component.html',
	styleUrls: ['./portrait-details.component.css']
})
export class PortraitDetailsComponent {
	private readonly escapeKeyCode = 27;
	public readonly imageUrl: string;

	private close: () => void;
	private images;
	private portraits: Portrait[];
	private index: number;

	constructor(private injector: Injector) {
		this.portraits = this.injector.get('portraits');
		this.index = this.portraits.indexOf(this.injector.get('portrait'));
		this.close = this.injector.get('close');
	}

	@HostListener('document:keydown', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		if (event.keyCode === this.escapeKeyCode) {
			this.close();
		}
	}

	next() {
		if (this.index + 1 === this.portraits.length) {
			this.index = -1;
		}

		this.index++;
	}


	previous() {
		if (this.index === 0) {
			this.index = this.portraits.length;
		}

		this.index--;
	}

	get portraitUrl() {
		return this.portraits[this.index].imageUrl;
	}
}
