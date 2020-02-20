import { Component, OnInit } from '@angular/core';
import { CardPersonService } from 'src/app/common/card-person/card-person.service';
import { ICardPerson } from 'src/app/common/interfaces/i-card-person';

@Component({
  selector: 'app-arjes-main',
  templateUrl: './arjes-main.component.html',
  styleUrls: ['./arjes-main.component.css']
})
export class ArjesMainComponent implements OnInit {

  constructor(
    private cardPersonService: CardPersonService
  ) { }


  contactCards: ICardPerson[] = [];

  ngOnInit() {

    this.contactCards.push(this.cardPersonService.getDelaerByNameSlashMark('radlak/arjes'));

  }

}
