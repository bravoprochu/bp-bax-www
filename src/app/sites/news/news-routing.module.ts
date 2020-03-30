import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsArticleComponent } from './news-article/news-article.component';
import { NewsListResolve } from './guards/news-list-resolve';
import { NewsResolve } from './guards/news.resolve';
import { ResolveAnimationIsDoneGuard } from '../../shared/guards/resolve-animation-is-done.guard';


const routes: Routes = [
  {
    path: ':id',
    component: NewsArticleComponent,
    data: {
      animation: 'news',
    },
    resolve: {
      data: NewsResolve
    },
  },
  {
    path: '',
    component: NewsListComponent,
    data: { 
       animation: 'newsList' 
    },
    resolve: {
       // data loaded in newsListComponent
       // data: NewsListResolve
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
