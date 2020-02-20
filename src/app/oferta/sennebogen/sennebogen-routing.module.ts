import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SennebogenMainComponent } from './sennebogen-main/sennebogen-main.component';

const routes: Routes = [
  {
    path: 'main',
    component: SennebogenMainComponent
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
export class SennebogenRoutingModule {}
