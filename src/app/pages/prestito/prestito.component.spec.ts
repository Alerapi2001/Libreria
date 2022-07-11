import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestitoComponent } from './prestito.component';

describe('PrestitoComponent', () => {
  let component: PrestitoComponent;
  let fixture: ComponentFixture<PrestitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
