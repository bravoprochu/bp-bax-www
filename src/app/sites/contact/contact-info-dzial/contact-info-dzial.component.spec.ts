import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoDzialComponent } from './contact-info-dzial.component';

describe('ContactInfoComponent', () => {
  let component: ContactInfoDzialComponent;
  let fixture: ComponentFixture<ContactInfoDzialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInfoDzialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoDzialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
