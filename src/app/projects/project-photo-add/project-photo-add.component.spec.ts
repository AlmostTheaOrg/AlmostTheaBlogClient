import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPhotoAddComponent } from './project-photo-add.component';

describe('ProjectPhotoAddComponent', () => {
  let component: ProjectPhotoAddComponent;
  let fixture: ComponentFixture<ProjectPhotoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPhotoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPhotoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
