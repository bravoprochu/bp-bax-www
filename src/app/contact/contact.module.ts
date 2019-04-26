import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SharedModule } from '../shared/shared.module';
import { ContactService } from './contact.service';
import { ContactInfoDzialComponent } from './contact-info-dzial/contact-info-dzial.component';
import { ContactInfoAboutComponent } from './contact-info-about/contact-info-about.component';
import { ContactInfoDealerComponent } from './contact-info-dealer/contact-info-dealer.component';


@NgModule({
  declarations: [
    ContactListComponent,
    ContactInfoDzialComponent,
    ContactInfoAboutComponent,
    ContactInfoDealerComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ContactRoutingModule
  ],
  providers: [
    ContactService
  ]
})
export class ContactModule { }
