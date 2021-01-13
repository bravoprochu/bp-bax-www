import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OfertaComponent } from './oferta/oferta.component';

const routes: Routes = [
  {
    path: '',
    component: OfertaComponent
  },

  {
    path: 'czesci',
    loadChildren: () => import('./czesci/czesci.module').then(m => m.CzesciModule),
  },
  {
    path: 'maszynyNowe',
    loadChildren: () => import('./maszynyNowe/maszyny-nowe.module').then(m => m.MaszynyNoweModule),
  },
  {
    path: 'arjes',
    loadChildren: () => import('./arjes/arjes.module').then(m => m.ArjesModule),
  },
  {
    path: 'guidetti',
    loadChildren: () => import('./guidetti/guidetti.module').then(m => m.GuidettiModule),
  },
  {
    path: 'sennebogen',
    loadChildren: () => import('./sennebogen/sennebogen.module').then(m => m.SennebogenModule),
  },
  {
    path: 'serwis',
    loadChildren: () => import('./serwis/serwis.module').then(m => m.SerwisModule),
  },
  {
    path: 'yanmar',
    loadChildren: () => import('./yanmar/yanmar.module').then(m => m.YanmarModule),
  },



  {
    path: '',
    redirectTo: 'maszynyNowe',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfertaRoutingModule {

}
