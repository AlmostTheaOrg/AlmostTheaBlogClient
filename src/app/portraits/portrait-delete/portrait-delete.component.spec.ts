import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitDeleteComponent } from './portrait-delete.component';

describe('ImageDeleteComponent', () => {
	let component: PortraitDeleteComponent;
	let fixture: ComponentFixture<PortraitDeleteComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ PortraitDeleteComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PortraitDeleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
