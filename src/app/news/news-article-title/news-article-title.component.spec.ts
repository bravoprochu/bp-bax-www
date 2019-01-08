import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsArticleTitleComponent } from './news-article-title.component';

describe('NewsArticleTitleComponent', () => {
  let component: NewsArticleTitleComponent;
  let fixture: ComponentFixture<NewsArticleTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsArticleTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsArticleTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
