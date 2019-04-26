import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsArticleMiniComponent } from './news-article-mini/news-article-mini.component';
import { NewsArticleTitleComponent } from './news-article-title/news-article-title.component';
import { SharedModule } from '../shared/shared.module';
import { NewsArticleComponent } from './news-article/news-article.component';
import { NewsArticleDateComponent } from './news-article-date/news-article-date.component';
import { NewsServicesModule } from './newsServices/news-services.module';



@NgModule({
  declarations: [
    NewsListComponent, 
    NewsArticleMiniComponent, 
    NewsArticleTitleComponent,
    NewsArticleComponent,
    NewsArticleDateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewsServicesModule,
    NewsRoutingModule,
  ],
  exports: [
    NewsArticleTitleComponent, 
  ],
})
export class NewsModule {}
