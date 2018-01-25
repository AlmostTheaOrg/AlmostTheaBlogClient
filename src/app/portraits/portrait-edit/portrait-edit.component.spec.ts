import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitEditComponent } from './portrait-edit.component';

describe('ImageEditComponent', () => {
	let component: PortraitEditComponent;
	let fixture: ComponentFixture<PortraitEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ PortraitEditComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PortraitEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
