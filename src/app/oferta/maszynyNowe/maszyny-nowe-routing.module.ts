import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaszynyNoweComponent } from './maszyny-nowe/maszyny-nowe.component';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelSpecComponent } from './model-spec/model-spec.component';
import { ModelMaszynyComponent } from './model-maszyny/model-maszyny.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'nowe/model',
    pathMatch: 'full'
  },
  {
    path: 'nowe',
    component: MaszynyNoweComponent,
    children: [
      {
        path: 'model/:id',
        component: ModelMaszynyComponent,
    
      },
      {
        path: 'model',
        component: ModelListComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'model',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaszynyNoweRoutingModule { }
