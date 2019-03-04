import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaszynyNoweComponent } from './maszyny-nowe.component';

describe('MaszynyNoweComponent', () => {
  let component: MaszynyNoweComponent;
  let fixture: ComponentFixture<MaszynyNoweComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaszynyNoweComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaszynyNoweComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
