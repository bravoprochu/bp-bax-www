import { Component, OnInit } from '@angular/core';
import { CardPersonService } from 'src/app/common/card-person/card-person.service';
import { ICardPerson } from 'src/app/common/interfaces/i-card-person';
import { BAX_BRANDS } from 'src/app/common/enums/bax-brands.enum';

@Component({
  selector: 'app-yanmar-main',
  templateUrl: './yanmar-main.component.html',
  styleUrls: ['./yanmar-main.component.css']
})
export class YanmarMainComponent implements OnInit {

  constructor(
    private cardPersonService: CardPersonService
  ) { }

  contactCards: ICardPerson[];


  ngOnInit() {
    this.contactCards = this.cardPersonService.getDelaersByMarka(BAX_BRANDS.Yanmar);

  }

}
