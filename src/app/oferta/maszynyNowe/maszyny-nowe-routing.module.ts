import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaszynyNoweComponent } from './maszyny-nowe/maszyny-nowe.component';
import { ModelMaszynyFullComponent } from './model-maszyny-full/model-maszyny-full.component';
import { MaszynyNoweListResolve } from './guards/maszyny-nowe-list.resolve';
import { MaszynyNoweReslove } from './guards/maszyny-nowe.resolve';


const routes: Routes = [
  {
    path: ':id',
    component: ModelMaszynyFullComponent,
    data: {
      animation: 'maszynyNowe',
    },
    resolve: {
      data: MaszynyNoweReslove
    },
  
  },
  {
    path: '',
    component: MaszynyNoweComponent,
    data: {
      animation: 'maszynyNoweList',
    },
    resolve: {
       // data: MaszynyNoweListResolve
    },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaszynyNoweRoutingModule { }
