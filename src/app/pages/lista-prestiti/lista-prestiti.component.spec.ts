import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPrestitiComponent } from './lista-prestiti.component';

describe('ListaPrestitiComponent', () => {
  let component: ListaPrestitiComponent;
  let fixture: ComponentFixture<ListaPrestitiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPrestitiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPrestitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
