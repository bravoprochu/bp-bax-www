import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OfertaService } from '../oferta.service';
import { BP_ANIM_BRICK_LIST } from 'src/app/animations/bp-anim-brick-list';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import * as Hammer from 'hammerjs';
import { IBaxModelSpec } from '../interfaces/i-bax-model-spec';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css'],
  animations: [
    BP_ANIM_BRICK_LIST(300, 250),
  ]
})
export class ModelListComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;
  baseUrl: string = window.location.href;
  isAwers: boolean = true;
  modelList: IBaxModelSpec[] = [];
  modelOnScreenId: number;
  constructor(
    private osrvc: OfertaService,
    public cf: CommonFunctionsService
  ) { }

  ngOnInit() {
    this.modelList = this.osrvc.getModelList();
    // this.initHammer();


  }

  initHammer() {
    const hammerManager = new Hammer(this.container.nativeElement, {})
    hammerManager.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    hammerManager.get('pinch').set({ enable: false });
    hammerManager.get('rotate').set({ enable: false });

    hammerManager.on('swipe', (ev) => {

      console.log(ev);
      
      
      const childs = (<HTMLElement>this.container.nativeElement).childNodes;
      
      
      let y: number;

      if ((ev.direction == 8) && (this.modelOnScreenId<childs.length-1)) {
        const next = (<HTMLElement>childs[this.modelOnScreenId+1]);

      //  console.log(`up.. | id: ${this.modelOnScreenId}, childs.length: ${childs.length} | next child Y: ${next.offsetTop}` );
        y = next.offsetTop;
        
      }
      if (ev.direction == 16 && this.modelOnScreenId>1) {
        const prev = (<HTMLElement>childs[this.modelOnScreenId-1]);
      //  console.log(`down.. | id: ${this.modelOnScreenId}, childs.length: ${childs.length} | next child Y: ${prev.offsetTop}` );
        y=prev.offsetTop;
      }

      window.scrollTo({top: y});
    })
  }

  setAsOnScreen(modelId: number) {
    
    this.modelOnScreenId = modelId + 1;
    console.log(this.modelOnScreenId);
  }

}
