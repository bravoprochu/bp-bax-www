import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMaszynyFullComponent } from './model-maszyny-full.component';

describe('ModelMaszynyFullComponent', () => {
  let component: ModelMaszynyFullComponent;
  let fixture: ComponentFixture<ModelMaszynyFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelMaszynyFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMaszynyFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
