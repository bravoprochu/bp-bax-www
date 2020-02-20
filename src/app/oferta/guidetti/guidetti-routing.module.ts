import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuidettiMainComponent } from './guidetti-main/guidetti-main.component';


const routes: Routes = [
  {
    path: 'main',
    component: GuidettiMainComponent
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
export class GuidettiRoutingModule { }
