import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'info',
    loadChildren: () => import('./sites/info/info.module').then(m => m.InfoModule),
    data: {animation: 'info'}
  },
  {
    path: 'news',
    loadChildren: () => import('./sites/news/news.module').then(m => m.NewsModule),
    data: {animation: 'news'}
  },
  {
    path: 'aktualnosci',
    redirectTo: 'news',
    pathMatch: 'prefix'
  },
  {
    path: 'nowosci',
    redirectTo: 'news',
    pathMatch: 'prefix'
  },
  {
    path: 'offer',
    loadChildren: () => import('./sites/oferta/oferta.module').then(m => m.OfertaModule),
    data: {animation: 'offer'}
  },
  {
    path:'oferta',
    redirectTo: 'offer',
    pathMatch: 'prefix'
  },
  {
    path: 'contact', 
    loadChildren: () => import('./sites/contact/contact.module').then(m => m.ContactModule),
    data: {animation: 'contact'}
  },
  {
    path:'kontakt',
    redirectTo: 'contact',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {animation: 'notFound'}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
