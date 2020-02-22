import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SerwisMainComponent } from './serwis-main/serwis-main.component';

const routes: Routes = [
  {
    path: 'home',
    component: SerwisMainComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SerwisRoutingModule { }
