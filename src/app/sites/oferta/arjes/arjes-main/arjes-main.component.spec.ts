import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArjesMainComponent } from './arjes-main.component';

describe('ArjesMainComponent', () => {
  let component: ArjesMainComponent;
  let fixture: ComponentFixture<ArjesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArjesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArjesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
