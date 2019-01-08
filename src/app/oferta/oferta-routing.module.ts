import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OfertaComponent } from "./oferta/oferta.component";

const routes: Routes = [
  {
    path: 'yanmar',
    loadChildren: './yanmar/yanmar.module#YanmarModule',
    data: {animation: 'yanmar'}
  },
  {
    path: 'sennebogen',
    loadChildren: './sennebogen/sennebogen.module#SennebogenModule',
    data: {animation: 'sennebogen'}
  },
  {
    path: '',
    component: OfertaComponent
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
