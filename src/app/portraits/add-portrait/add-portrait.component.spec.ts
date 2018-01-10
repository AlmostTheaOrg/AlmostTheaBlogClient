import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPortraitComponent } from './add-portrait.component';

describe('AddPortraitComponent', () => {
  let component: AddPortraitComponent;
  let fixture: ComponentFixture<AddPortraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPortraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPortraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
