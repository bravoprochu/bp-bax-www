import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsArticleMiniComponent } from './news-article-mini/news-article-mini.component';
import { NewsArticleTitleComponent } from './news-article-title/news-article-title.component';
import { SharedModule } from '../shared/shared.module';
import { NewsArticleComponent } from './news-article/news-article.component';
import { NewsArticleDateComponent } from './news-article-date/news-article-date.component';


@NgModule({
  declarations: [
    NewsListComponent, 
    NewsArticleMiniComponent, 
    NewsArticleTitleComponent,
    NewsArticleComponent,
    NewsArticleDateComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    NewsRoutingModule
  ],
  exports: [
    NewsArticleTitleComponent, 
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class NewsModule { }
