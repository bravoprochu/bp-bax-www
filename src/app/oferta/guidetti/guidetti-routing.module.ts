import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuidettiMainComponent } from './guidetti-main/guidetti-main.component';


const routes: Routes = [
  {
    path: '',
    component: GuidettiMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidettiRoutingModule { }
