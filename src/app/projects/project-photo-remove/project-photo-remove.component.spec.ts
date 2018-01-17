import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPhotoRemoveComponent } from './project-photo-remove.component';

describe('ProjectPhotoRemoveComponent', () => {
	let component: ProjectPhotoRemoveComponent;
	let fixture: ComponentFixture<ProjectPhotoRemoveComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProjectPhotoRemoveComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectPhotoRemoveComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
