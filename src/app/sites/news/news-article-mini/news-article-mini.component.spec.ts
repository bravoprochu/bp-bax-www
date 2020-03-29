import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsArticleMiniComponent } from './news-article-mini.component';

describe('NewsArticleComponent', () => {
  let component: NewsArticleMiniComponent;
  let fixture: ComponentFixture<NewsArticleMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsArticleMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsArticleMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
