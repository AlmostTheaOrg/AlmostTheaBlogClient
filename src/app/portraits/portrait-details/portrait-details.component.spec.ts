import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitDetailsComponent } from './portrait-details.component';

describe('ImageDetailsComponent', () => {
	let component: PortraitDetailsComponent;
	let fixture: ComponentFixture<PortraitDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ PortraitDetailsComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PortraitDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
