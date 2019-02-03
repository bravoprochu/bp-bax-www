import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMaszynyComponent } from './model-maszyny.component';

describe('ModelMaszynyComponent', () => {
  let component: ModelMaszynyComponent;
  let fixture: ComponentFixture<ModelMaszynyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelMaszynyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMaszynyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
