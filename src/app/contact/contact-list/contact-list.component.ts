import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { PantoneToHexService } from 'src/app/pantoneToHex/pantone-to-hex.service';
import { IPantoneToHex } from 'src/app/pantoneToHex/interfaces/i-pantone-to-hex';
import { SvgCommonFunctionsService } from 'src/app/shared/svg/svg-common-functions.service';
import { SVGElementProp } from 'src/app/shared/svg/classes/svg-element-prop';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import { IContactCard } from '../interfaces/i-contact-dzial';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @ViewChild('container') container: ElementRef;
  contactList: IContactCard[] = [];

  constructor(
    private pantoneService: PantoneToHexService,
    private renderer: Renderer2,
    private svgService: SvgCommonFunctionsService,
    public cf: CommonFunctionsService,
    private contactSrv: ContactService,

    
  ) { }


  colorBrick: IPantoneToHex[] = [];

  ngOnInit() {
    this.colorBrick = this.pantoneService.getNextPaletteColors("350", 10, 50);
    // console.log('prev', this.pantoneService.getPrevColor("101"));
    // console.log('next', this.pantoneService.getNextColor("600"));
    this.initSVG();
    this.contactList = this.contactSrv.getContactList();
  }


  initSVG(){
    const svgImageProp = new SVGElementProp();
  }

}
