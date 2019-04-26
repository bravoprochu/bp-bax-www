import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoAboutComponent } from './contact-info-about.component';

describe('ContactInfoAboutComponent', () => {
  let component: ContactInfoAboutComponent;
  let fixture: ComponentFixture<ContactInfoAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInfoAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
