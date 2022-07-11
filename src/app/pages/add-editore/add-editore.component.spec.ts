import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditoreComponent } from './add-editore.component';

describe('AddEditoreComponent', () => {
  let component: AddEditoreComponent;
  let fixture: ComponentFixture<AddEditoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
