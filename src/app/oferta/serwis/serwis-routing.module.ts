import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SerwisMainComponent } from './serwis-main/serwis-main.component';

const routes: Routes = [
  {
    path: '',
    component: SerwisMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SerwisRoutingModule { }
