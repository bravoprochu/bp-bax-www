import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'maszynyNowe',
    loadChildren: './maszynyNowe/maszyny-nowe.module#MaszynyNoweModule',
    // data: {animation: 'maszynyNoweList'},
  },
  // {
  //   path: 'yanmar',
  //   loadChildren: './yanmar/yanmar.module#YanmarModule',
  //   data: { animation: 'yanmar' }
  // },
  // {
  //   path: 'sennebogen',
  //   loadChildren: './sennebogen/sennebogen.module#SennebogenModule',
  //   data: { animation: 'sennebogen' }
  // },
  {
    path: '',
    redirectTo: 'maszynyNowe',
    pathMatch: 'full'

    //component: OfertaComponent
  },
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertaRoutingModule {

}
