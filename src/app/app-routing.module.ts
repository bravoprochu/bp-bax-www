import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OfertaModule} from './oferta/oferta.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'news',
    loadChildren: './news/news.module#NewsModule',
    data: {animation: 'news'}
  },
  {
    path: 'oferta',
    loadChildren: './oferta/oferta.module#OfertaModule',
    data: {animation: 'oferta'}
  },
  {
    path: '',
    component: HomeComponent,
    data: {animation: 'home'}
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {animation: 'notFound'}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
