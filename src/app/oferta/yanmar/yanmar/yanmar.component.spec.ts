import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YanmarComponent } from './yanmar.component';

describe('YanmarComponent', () => {
  let component: YanmarComponent;
  let fixture: ComponentFixture<YanmarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YanmarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YanmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
