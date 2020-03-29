import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerwisMainComponent } from './serwis-main.component';

describe('SerwisMainComponent', () => {
  let component: SerwisMainComponent;
  let fixture: ComponentFixture<SerwisMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerwisMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerwisMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
