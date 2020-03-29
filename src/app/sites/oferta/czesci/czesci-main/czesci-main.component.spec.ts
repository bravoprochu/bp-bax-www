import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CzesciMainComponent } from './czesci-main.component';

describe('CzesciMainComponent', () => {
  let component: CzesciMainComponent;
  let fixture: ComponentFixture<CzesciMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CzesciMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CzesciMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
