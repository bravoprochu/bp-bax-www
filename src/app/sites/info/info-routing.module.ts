import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaxBauma2019SennebogenComponent } from './bax-bauma2019-sennebogen/bax-bauma2019-sennebogen.component';
import { BaxERoboczeSosnowiec2019Component } from './bax-erobocze-sosnowiec2019/bax-erobocze-sosnowiec2019.component';

const routes: Routes = [
  {
    path: 'bax-eRobocze-Sosnowiec-2019',
    component: BaxERoboczeSosnowiec2019Component
  },
  {
    path: 'bax-bauma2019-sennebogen-voucher',
    component: BaxBauma2019SennebogenComponent
  },
  {
    path: '',
    redirectTo: 'bax-eRobocze-Sosnowiec-2019',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: BaxERoboczeSosnowiec2019Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
