import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SennebogenMainComponent } from './sennebogen-main/sennebogen-main.component';

const routes: Routes = [
  {
    path: 'home',
    component: SennebogenMainComponent
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
export class SennebogenRoutingModule {}
