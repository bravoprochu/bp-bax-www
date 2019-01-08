import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterGoBackComponent } from './router-go-back.component';

describe('RouterGoBackComponent', () => {
  let component: RouterGoBackComponent;
  let fixture: ComponentFixture<RouterGoBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterGoBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterGoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
