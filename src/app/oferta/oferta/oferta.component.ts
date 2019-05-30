import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { environment } from 'src/environments/environment';
import { IBrickInfo } from 'src/app/shared/article-container/interfaces/i-brick-info';
import { IBrickColors } from 'src/app/shared/article-container/interfaces/i-brick-colors';
import { BP_ANIM_BRICK_LIST } from 'src/app/animations/bp-anim-brick-list';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  animations: [
    BP_ANIM_BRICK_LIST()
  ]
})
export class OfertaComponent implements OnInit {

  ngOnInit() {
    this.initData();
  }


  title = 'bax';
  staggerDelay: number = 200;
  isClicked: boolean = true;


  initData() {


  }

}
