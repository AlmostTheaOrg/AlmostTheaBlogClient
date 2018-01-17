import { Injector } from '@angular/core';

export abstract class ModalWindow {
	private closeWindow: () => void;
	constructor(private injector: Injector) {
		this.closeWindow = this.injector.get('close');
	}

	public close() {
		this.closeWindow();
	}
}
