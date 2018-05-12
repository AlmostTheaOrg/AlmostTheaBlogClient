import { Component } from '@angular/core';
import { fadeAnimation } from './shared/animations/fade.animation';
declare var document: Document;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	animations: [fadeAnimation]
})
export class AppComponent {
	constructor() {
		if (document.addEventListener) {
			const allImages = document.querySelectorAll('img');
			Array.from(allImages).forEach(item => {
				console.log(item);
				item.addEventListener('contextmenu', function (e) {
					alert('You\'ve tried to open context menu');
					e.preventDefault();
				}, false);
			});
		}
	}

	public getRouterOutletState(outlet) {
		return outlet.isActivated ? outlet.activatedRoute : '';
	}

	public handleRightClick() {
		return false;
	}
}
