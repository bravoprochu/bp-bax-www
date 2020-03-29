import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CzesciMainComponent } from './czesci-main/czesci-main.component';


const routes: Routes = [
  {
    path: '',
    component: CzesciMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CzesciRoutingModule { }
