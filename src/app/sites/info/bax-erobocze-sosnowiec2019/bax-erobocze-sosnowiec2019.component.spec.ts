import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaxERoboczeSosnowiec2019Component } from './bax-erobocze-sosnowiec2019.component';

describe('BaxERoboczeSosnowiec2019Component', () => {
  let component: BaxERoboczeSosnowiec2019Component;
  let fixture: ComponentFixture<BaxERoboczeSosnowiec2019Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaxERoboczeSosnowiec2019Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaxERoboczeSosnowiec2019Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
