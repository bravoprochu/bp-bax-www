import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaTitleBlockComponent } from './oferta-title-block.component';

describe('OfertaTitleBlockComponent', () => {
  let component: OfertaTitleBlockComponent;
  let fixture: ComponentFixture<OfertaTitleBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaTitleBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaTitleBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
