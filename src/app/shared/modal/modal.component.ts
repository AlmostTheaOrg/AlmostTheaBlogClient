import {
	Component,
	Input,
	ViewContainerRef,
	ViewChild,
	ReflectiveInjector,
	ComponentFactoryResolver
} from '@angular/core';
import {
	ImageAddComponent,
	ImageDetailsComponent,
	ImageEditComponent,
	ImageDeleteComponent
} from '../../portraits/index';
import { ProjectAddComponent } from '../../projects/project-add/project-add.component';
@Component({
	selector: 'app-modal',
	entryComponents: [
		ImageAddComponent,
		ImageDetailsComponent,
		ImageEditComponent,
		ImageDeleteComponent,
		ProjectAddComponent
	],
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css']
})
export class ModalComponent {
	currentComponent = null;
	public viewClass = 'lightbox-target';

	@ViewChild('appModalContainer', { read: ViewContainerRef })
	dynamicComponentContainer: ViewContainerRef;

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

	private reverseView() {
		if (this.viewClass === 'lightbox-target') {
			this.viewClass = 'lightbox-target selected';
		} else {
			this.viewClass = 'lightbox-target';
		}
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

	constructor(private resolver: ComponentFactoryResolver) { }
}