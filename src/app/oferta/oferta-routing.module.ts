import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OfertaComponent } from './oferta/oferta.component';

const routes: Routes = [
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
    component: OfertaComponent
  },

  {
    path: 'czesci',
    loadChildren: () => import('./czesci/czesci.module').then(m => m.CzesciModule),
    // data: {animation: 'maszynyNoweList'},
  },
  {
    path: 'maszynyNowe',
    loadChildren: () => import('./maszynyNowe/maszyny-nowe.module').then(m => m.MaszynyNoweModule),
    // data: {animation: 'maszynyNoweList'},
  },
  {
    path: 'arjes',
    loadChildren: () => import('./arjes/arjes.module').then(m => m.ArjesModule),
    // data: {animation: 'maszynyNoweList'},
  },
  {
    path: 'guidetti',
    loadChildren: () => import('./guidetti/guidetti.module').then(m => m.GuidettiModule),
    // data: {animation: 'maszynyNoweList'},
  },
  {
    path: 'sennebogen',
    loadChildren: () => import('./sennebogen/sennebogen.module').then(m => m.SennebogenModule),
    // data: {animation: 'maszynyNoweList'},
  },
  {
    path: 'serwis',
    loadChildren: () => import('./serwis/serwis.module').then(m => m.SerwisModule),
    // data: {animation: 'maszynyNoweList'},
  },
  {
    path: 'yanmar',
    loadChildren: () => import('./yanmar/yanmar.module').then(m => m.YanmarModule),
    // data: {animation: 'maszynyNoweList'},
  },



  {
    path: '',
    redirectTo: 'maszynyNowe',
    pathMatch: 'full'

    //component: OfertaComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertaRoutingModule {

}
