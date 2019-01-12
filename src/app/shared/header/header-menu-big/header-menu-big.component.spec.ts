import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuBigComponent } from './header-menu-big.component';

describe('HeaderMenuBigComponent', () => {
  let component: HeaderMenuBigComponent;
  let fixture: ComponentFixture<HeaderMenuBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
