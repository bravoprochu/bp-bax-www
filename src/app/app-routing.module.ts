import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'info',
    loadChildren: './info/info.module#InfoModule',
    data: {animation: 'info'}
  },
  {
    path: 'news',
    loadChildren: './news/news.module#NewsModule',
    data: {animation: 'news'}
  },
  // {
  //   path: 'offer',
  //   loadChildren: './oferta/maszynyNowe/maszyny-nowe.module#MaszynyNoweModule',
  //   data: {animation: 'offer'}
  // },
  {
    path: 'offer',
    loadChildren: './oferta/oferta.module#OfertaModule',
    data: {animation: 'offer'}
  },
  {
    path:'oferta',
    redirectTo: 'offer',
    pathMatch: 'full'
  },
  {
    path: 'contact', 
    loadChildren: './contact/contact.module#ContactModule',
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
    // component: HomeComponent,
    // data: {animation: 'home'}
    redirectTo: '/news',
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
