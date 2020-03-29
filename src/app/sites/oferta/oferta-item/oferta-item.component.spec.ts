import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaItemComponent } from './oferta-item.component';

describe('OfertaItemComponent', () => {
  let component: OfertaItemComponent;
  let fixture: ComponentFixture<OfertaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
