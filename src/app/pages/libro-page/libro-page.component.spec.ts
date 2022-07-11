import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroPageComponent } from './libro-page.component';

describe('LibroPageComponent', () => {
  let component: LibroPageComponent;
  let fixture: ComponentFixture<LibroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
