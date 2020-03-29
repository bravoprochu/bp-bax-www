import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgButtonYoutubeComponent } from './svg-button-youtube.component';

describe('SvgButtonYoutubeComponent', () => {
  let component: SvgButtonYoutubeComponent;
  let fixture: ComponentFixture<SvgButtonYoutubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgButtonYoutubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgButtonYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
