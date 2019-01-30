import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsArticleMiniComponent } from './news-article-mini/news-article-mini.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsArticleComponent } from './news-article/news-article.component';

const routes: Routes = [
  {
    path: ':id',
    component: NewsArticleComponent,
    data: { animation: 'article' }
  },
  {
    path: '',
    component: NewsListComponent,
    data: {animation: 'newsList'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
