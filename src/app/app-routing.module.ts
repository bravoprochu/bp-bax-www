import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then(m => m.InfoModule),
    data: {animation: 'info'}
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
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
  // {
  //   path: 'offer',
  //   loadChildren: './oferta/maszynyNowe/maszyny-nowe.module#MaszynyNoweModule',
  //   data: {animation: 'offer'}
  // },
  {
    path: 'offer',
    loadChildren: () => import('./oferta/oferta.module').then(m => m.OfertaModule),
    data: {animation: 'offer'}
  },
  {
    path:'oferta',
    redirectTo: 'offer',
    pathMatch: 'prefix'
  },
  {
    path: 'contact', 
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
    data: {animation: 'contact'}
  },
  {
    path:'kontakt',
    redirectTo: 'contact',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {animation: 'home'}
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
    //scrollPositionRestoration: 'disabled',
    anchorScrolling: 'enabled',
    


  })],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
