import { Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import { PortraitAddComponent, PortraitDetailsComponent, PortraitEditComponent, PortraitDeleteComponent } from '../../portraits';
import {
	ProjectAddComponent,
	ProjectEditComponent,
	ProjectPhotoAddComponent,
	ProjectDeleteComponent,
	ProjectPhotoRemoveComponent,
} from '../../projects';

@Component({
	selector: 'app-modal',
	entryComponents: [
		PortraitAddComponent,
		PortraitDetailsComponent,
		PortraitEditComponent,
		PortraitDeleteComponent,
		ProjectAddComponent,
		ProjectEditComponent,
		ProjectPhotoAddComponent,
		ProjectDeleteComponent,
		ProjectPhotoRemoveComponent,
	],
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css']
})
export class ModalComponent {
	currentComponent = null;
	public viewClass = 'lightbox-target';

	@ViewChild('appModalContainer', { read: ViewContainerRef })
	dynamicComponentContainer: ViewContainerRef;

	constructor(private resolver: ComponentFactoryResolver) { }

	// component: Class for the component you want to create
	// inputs: An object with key/value pairs mapped to input name/input value
	@Input()
	set componentData(data: { component: any; inputs: any }) {
		if (!data) {
			return;
		}

		// Inputs need to be in the following format to be resolved properly
		const inputProviders = Object.keys(data.inputs).map(inputName => {
			return { provide: inputName, useValue: data.inputs[inputName] };
		});
		const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

		// We create an injector out of the data we want to pass down and this components injector
		const injector = ReflectiveInjector.fromResolvedProviders(
			resolvedInputs,
			this.dynamicComponentContainer.parentInjector
		);

		// We create a factory out of the component we want to create
		const factory = this.resolver.resolveComponentFactory(data.component);

		// We create the component using the factory and the injector
		const component = factory.create(injector);

		// We insert the component into the dom container
		this.dynamicComponentContainer.insert(component.hostView);

		// We can destroy the old component is we like by calling destroy
		this.destroy();

		this.currentComponent = component;
	}

	/**
   * destroy
   */
	public destroy() {
		if (this.currentComponent) {
			this.currentComponent.destroy();
		}

		this.reverseView();
	}

	private reverseView() {
		if (this.viewClass === 'lightbox-target') {
			this.viewClass = 'lightbox-target selected';
		} else {
			this.viewClass = 'lightbox-target';
		}
	}
}
