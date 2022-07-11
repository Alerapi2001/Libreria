import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutoreComponent } from './add-autore.component';

describe('AddAutoreComponent', () => {
  let component: AddAutoreComponent;
  let fixture: ComponentFixture<AddAutoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAutoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAutoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
