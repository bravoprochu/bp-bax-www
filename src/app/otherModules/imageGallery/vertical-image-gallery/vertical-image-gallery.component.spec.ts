import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalImageGalleryComponent } from './vertical-image-gallery.component';

describe('VerticalImageGalleryComponent', () => {
  let component: VerticalImageGalleryComponent;
  let fixture: ComponentFixture<VerticalImageGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalImageGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
