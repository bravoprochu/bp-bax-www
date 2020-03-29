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
import { ModelMaszynyFullComponent } from './model-maszyny-full/model-maszyny-full.component';
import { MaszynyNoweServicesModule } from './maszynyNoweServices/maszyny-nowe-services.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaszynyNoweFilterComponent } from './maszyny-nowe-filter/maszyny-nowe-filter.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  entryComponents: [
  ],
  declarations: [
    ModelSpecComponent,
    ModelListComponent,
    ModelMaszynyComponent,
    ModelMaszynyFirstComponent,
    ModelMaszynySpecComponent,
    ModelMaszynySpecLineComponent,
    MaszynyNoweComponent,
    ModelMaszynyFullComponent,
    MaszynyNoweFilterComponent
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSliderModule,



    MaszynyNoweServicesModule,
    MaszynyNoweRoutingModule,
  ],
  exports: [
    MaszynyNoweComponent,
  ],
})
export class MaszynyNoweModule { }
