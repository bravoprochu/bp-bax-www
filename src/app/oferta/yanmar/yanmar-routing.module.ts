import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YanmarComponent } from './yanmar/yanmar.component';
import { YanmarMainComponent } from './yanmar-main/yanmar-main.component';

const routes: Routes = [
  {
    path: 'main',
    component: YanmarMainComponent
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
export class YanmarRoutingModule { }
