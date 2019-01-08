import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { NewsArticleTitleComponent } from './news-article-title/news-article-title.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NewsListComponent, NewsArticleComponent, NewsArticleTitleComponent],
  imports: [
    SharedModule,
    CommonModule,
    NewsRoutingModule
  ],
  exports: [NewsArticleTitleComponent]
})
export class NewsModule { }
