import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YanmarMainComponent } from './yanmar-main.component';

describe('YanmarMainComponent', () => {
  let component: YanmarMainComponent;
  let fixture: ComponentFixture<YanmarMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YanmarMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YanmarMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
