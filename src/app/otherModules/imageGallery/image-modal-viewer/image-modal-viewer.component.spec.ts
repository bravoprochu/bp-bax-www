import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageModalViewerComponent } from './image-modal-viewer.component';

describe('ImageModalViewerComponent', () => {
  let component: ImageModalViewerComponent;
  let fixture: ComponentFixture<ImageModalViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageModalViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageModalViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
