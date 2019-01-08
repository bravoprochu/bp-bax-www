import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsArticleComponent } from './news-article/news-article.component';
import { NewsListComponent } from './news-list/news-list.component';

const routes: Routes = [
  {
    path: ':id',
    component: NewsArticleComponent,
    data: { animation: 'newsHome' }
  },
  {
    path: '',
    component: NewsListComponent,
    data: {animation: 'list'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
