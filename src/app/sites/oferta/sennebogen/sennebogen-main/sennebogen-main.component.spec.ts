import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SennebogenMainComponent } from './sennebogen-main.component';

describe('SennebogenMainComponent', () => {
  let component: SennebogenMainComponent;
  let fixture: ComponentFixture<SennebogenMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SennebogenMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SennebogenMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
