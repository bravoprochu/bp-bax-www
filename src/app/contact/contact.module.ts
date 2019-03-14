import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ContactListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }
