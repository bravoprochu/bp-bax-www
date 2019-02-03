import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OfertaComponent } from "./oferta/oferta.component";
import { ModelListComponent } from './model-list/model-list.component';
import { ModelSpecComponent } from './model-spec/model-spec.component';


const routes: Routes = [
  {
    path: 'model/:id',
    component: ModelSpecComponent
  },
  {
    path: 'model',
    component: ModelListComponent
  },
  {
    path: 'listaModeli',
    component: ModelListComponent
  },
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
