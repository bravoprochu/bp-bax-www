import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArjesMainComponent } from './arjes-main/arjes-main.component';

const routes: Routes = [
  {
    path: 'home',
    component: ArjesMainComponent
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
export class ArjesRoutingModule { }
