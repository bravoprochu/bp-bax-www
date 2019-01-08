import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YanmarComponent } from './yanmar/yanmar.component';

const routes: Routes = [
  {path: '', component: YanmarComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YanmarRoutingModule { }
