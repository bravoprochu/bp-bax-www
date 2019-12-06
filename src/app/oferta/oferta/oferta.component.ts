import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BP_ANIM_BRICK_LIST } from 'src/app/animations/bp-anim-brick-list';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import {} from '@angular/cdk/layout';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  animations: [
    BP_ANIM_BRICK_LIST()
  ]
})
export class OfertaComponent implements OnInit, AfterViewInit {
  /**
   *
   */
  constructor(
    private cf: CommonFunctionsService
    ){}

  ngOnInit() {

    // const tag = document.createElement('script');
    // tag.src = "https://www.youtube.com/iframe_api";
    // document.body.appendChild(tag);
    
    this.initYoutube();
    this.initData();
  }

  ngAfterViewInit(): void {
    this.minHeight = window.innerHeight - this.cf.navHeight;
    console.log('minHeight', this.minHeight);
    
    
  }


  minHeight:number; 
  title = 'bax';
  staggerDelay: number = 200;
  isClicked: boolean = true;
  playerVars:{} = {
    
  }


  initYoutube(){
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  initData() {


  }




}
