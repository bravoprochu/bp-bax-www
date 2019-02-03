import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSpecComponent } from './model-spec.component';

describe('ModelSpecComponent', () => {
  let component: ModelSpecComponent;
  let fixture: ComponentFixture<ModelSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
