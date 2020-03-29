import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaxBauma2019SennebogenComponent } from './bax-bauma2019-sennebogen.component';

describe('BaxBauma2019SennebogenComponent', () => {
  let component: BaxBauma2019SennebogenComponent;
  let fixture: ComponentFixture<BaxBauma2019SennebogenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaxBauma2019SennebogenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaxBauma2019SennebogenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
