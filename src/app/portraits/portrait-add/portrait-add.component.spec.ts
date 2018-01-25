import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitAddComponent } from './portrait-add.component';

describe('ImageAddComponent', () => {
	let component: PortraitAddComponent;
	let fixture: ComponentFixture<PortraitAddComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ PortraitAddComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PortraitAddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
