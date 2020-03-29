import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArjesMainComponent } from './arjes-main/arjes-main.component';

const routes: Routes = [
  {
    path: '',
    component: ArjesMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArjesRoutingModule { }
