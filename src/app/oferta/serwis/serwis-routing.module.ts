import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SerwisMainComponent } from './serwis-main/serwis-main.component';

const routes: Routes = [
  {
    path: 'main',
    component: SerwisMainComponent
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SerwisRoutingModule { }
