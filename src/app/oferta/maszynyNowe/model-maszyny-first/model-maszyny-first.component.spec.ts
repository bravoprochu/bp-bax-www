import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMaszynyFirstComponent } from './model-maszyny-first.component';

describe('ModelMaszynyFirstComponent', () => {
  let component: ModelMaszynyFirstComponent;
  let fixture: ComponentFixture<ModelMaszynyFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelMaszynyFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMaszynyFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
