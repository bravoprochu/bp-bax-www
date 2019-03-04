import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMaszynySpecLineComponent } from './model-maszyny-spec-line.component';

describe('ModelMaszynySpecLineComponent', () => {
  let component: ModelMaszynySpecLineComponent;
  let fixture: ComponentFixture<ModelMaszynySpecLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelMaszynySpecLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMaszynySpecLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
