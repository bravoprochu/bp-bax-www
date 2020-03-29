import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YanmarComponent } from './yanmar/yanmar.component';
import { YanmarMainComponent } from './yanmar-main/yanmar-main.component';

const routes: Routes = [
  {
    path: '',
    component: YanmarMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YanmarRoutingModule { }
