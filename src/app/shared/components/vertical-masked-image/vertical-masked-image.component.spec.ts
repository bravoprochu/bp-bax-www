import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalMaskedImageComponent } from './vertical-masked-image.component';

describe('VerticalMaskedImageComponent', () => {
  let component: VerticalMaskedImageComponent;
  let fixture: ComponentFixture<VerticalMaskedImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalMaskedImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalMaskedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
