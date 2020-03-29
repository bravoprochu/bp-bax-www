import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidettiMainComponent } from './guidetti-main.component';

describe('GuidettiMainComponent', () => {
  let component: GuidettiMainComponent;
  let fixture: ComponentFixture<GuidettiMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidettiMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidettiMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
