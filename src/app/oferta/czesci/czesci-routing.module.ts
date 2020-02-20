import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CzesciMainComponent } from './czesci-main/czesci-main.component';


const routes: Routes = [
  {
    path: 'main',
    component: CzesciMainComponent
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
export class CzesciRoutingModule { }
