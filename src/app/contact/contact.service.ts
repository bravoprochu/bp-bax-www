import { Injectable } from '@angular/core';
import { IContactCard } from './interfaces/i-contact-dzial';
import { CONTACT_LIST } from './data/contact-list-dzial';

@Injectable({
  providedIn: 'root'
})
export class ContactService  {
  contactList: IContactCard[] = CONTACT_LIST;

  constructor() {       
  }

  getContactList(){
    return this.contactList;
  }
}
