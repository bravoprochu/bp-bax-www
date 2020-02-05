import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaItemSennebogenComponent } from './oferta-item-sennebogen.component';

describe('OfertaItemSennebogenComponent', () => {
  let component: OfertaItemSennebogenComponent;
  let fixture: ComponentFixture<OfertaItemSennebogenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaItemSennebogenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaItemSennebogenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
