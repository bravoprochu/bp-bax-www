import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaszynyNoweRoutingModule } from './maszyny-nowe-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaszynyNoweComponent } from './maszyny-nowe/maszyny-nowe.component';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelMaszynyComponent } from './model-maszyny/model-maszyny.component';
import { ModelMaszynyFirstComponent } from './model-maszyny-first/model-maszyny-first.component';
import { ModelMaszynySpecComponent } from './model-maszyny-spec/model-maszyny-spec.component';
import { ModelMaszynySpecLineComponent } from './model-maszyny-spec-line/model-maszyny-spec-line.component';
import { ModelSpecComponent } from './model-spec/model-spec.component';
import { MaszynyNoweService } from './maszyny-nowe.service';

@NgModule({
  declarations: [
    ModelSpecComponent,
    ModelListComponent,
    ModelMaszynyComponent,
    ModelMaszynyFirstComponent,
    ModelMaszynySpecComponent,
    ModelMaszynySpecLineComponent,
    MaszynyNoweComponent,
  ],
  imports: [
    CommonModule,
    MaszynyNoweRoutingModule,
    SharedModule
  ],
  providers:[
    MaszynyNoweService
  ]
})
export class MaszynyNoweModule {}
