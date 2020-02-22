import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CzesciMainComponent } from './czesci-main/czesci-main.component';


const routes: Routes = [
  {
    path: 'home',
    component: CzesciMainComponent
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
export class CzesciRoutingModule { }
