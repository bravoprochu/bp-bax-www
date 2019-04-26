import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaxBauma2019SennebogenComponent } from './bax-bauma2019-sennebogen/bax-bauma2019-sennebogen.component';

const routes: Routes = [
  {
    path: 'bax-bauma2019-sennebogen-voucher',
    component: BaxBauma2019SennebogenComponent
  },
  {
    path: '',
    redirectTo: 'bax-bauma2019-sennebogen-voucher',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: BaxBauma2019SennebogenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
