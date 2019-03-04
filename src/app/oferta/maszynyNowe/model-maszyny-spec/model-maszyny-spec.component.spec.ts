import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMaszynySpecComponent } from './model-maszyny-spec.component';

describe('ModelMaszynySpecComponent', () => {
  let component: ModelMaszynySpecComponent;
  let fixture: ComponentFixture<ModelMaszynySpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelMaszynySpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMaszynySpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
