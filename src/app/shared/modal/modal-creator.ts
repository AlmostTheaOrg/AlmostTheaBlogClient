export abstract class ModalCreator {
	public componentData: { component: object, inputs: object };

	public open(component: any, inputs: any) {
		inputs.close = this.close.bind(this);
		this.componentData = {
			component: component,
			inputs: inputs
		};
	}

	public close() {
		this.getModalComponent().destroy();
	}

	public abstract getModalComponent();
}
