import { Component, OnInit, Input } from '@angular/core';
import { IContactCard as IContactDzial } from '../interfaces/i-contact-dzial';

@Component({
  selector: 'app-contact-info-dzial',
  templateUrl: './contact-info-dzial.component.html',
  styleUrls: ['./contact-info-dzial.component.css']
})
export class ContactInfoDzialComponent implements OnInit {
  @Input('contactInfo') dzial: IContactDzial;

  constructor() { }

  ngOnInit() {
    
  }

}
