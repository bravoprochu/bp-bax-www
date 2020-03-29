import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgBackgroundComponent } from './svg-background.component';

describe('SvgBackgroundComponent', () => {
  let component: SvgBackgroundComponent;
  let fixture: ComponentFixture<SvgBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
