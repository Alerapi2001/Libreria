import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibriListComponent } from './libri-list.component';

describe('LibriListComponent', () => {
  let component: LibriListComponent;
  let fixture: ComponentFixture<LibriListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibriListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibriListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
