import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoDealerComponent } from './contact-info-dealer.component';

describe('ContactInfoDealerComponent', () => {
  let component: ContactInfoDealerComponent;
  let fixture: ComponentFixture<ContactInfoDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInfoDealerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
