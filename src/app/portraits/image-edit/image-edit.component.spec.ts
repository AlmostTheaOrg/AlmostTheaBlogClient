import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditComponent } from './image-edit.component';

describe('ImageEditComponent', () => {
	let component: ImageEditComponent;
	let fixture: ComponentFixture<ImageEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ImageEditComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ImageEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
