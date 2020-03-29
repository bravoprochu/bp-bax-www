import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaszynyNoweFilterComponent } from './maszyny-nowe-filter.component';

describe('MaszynyNoweFilterComponent', () => {
  let component: MaszynyNoweFilterComponent;
  let fixture: ComponentFixture<MaszynyNoweFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaszynyNoweFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaszynyNoweFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
