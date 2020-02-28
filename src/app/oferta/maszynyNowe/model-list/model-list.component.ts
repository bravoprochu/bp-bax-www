import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BP_ANIM_BRICK_LIST } from 'src/app/animations/bp-anim-brick-list';
import { CommonFunctionsService } from 'src/app/shared/common-functions.service';
import * as Hammer from 'hammerjs';
import { IBaxModelMaszynaNowa } from '../../interfaces/i-bax-model-maszyna-nowa';
import { bp_anim_filter } from 'src/app/animations/bp_anim_filter';
import { BP_ANIM_GROUP_APPEAR_ONLY } from 'src/app/animations/bp_anim_group_appear_only';
import { MaszynyNoweService } from '../maszynyNoweServices/maszyny-nowe.service';
import { IImageGalleryPayload } from 'src/app/shared/interfaces/i-image-gallery-payload';
import { IImageGalleryItem } from 'src/app/shared/interfaces/i-image-gallery-item';
import { ImageGalleryPayload } from 'src/app/shared/interfaces/image-gallery-payload';


@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css'],
  animations: [
    BP_ANIM_BRICK_LIST(300, 250),
    bp_anim_filter(),
    BP_ANIM_GROUP_APPEAR_ONLY(1500, 500,'rect, image')
  ]
})
export class ModelListComponent implements OnInit {
  @ViewChild('container', {static: true}) container!: ElementRef;
  baseUrl: string = window.location.href;
  isAwers: boolean = true;
  modelList: IBaxModelMaszynaNowa[] = [];
  modelOnScreenId: number;

  imageGallery: IImageGalleryItem[] = [];

  
  
  constructor(
    public mnSrv: MaszynyNoweService,
    public cf: CommonFunctionsService,
  ) { }

  ngOnInit() {
    const _imageGalleryItemList = this.mnSrv.maszynyNoweList.map(m=>{
      return <IImageGalleryItem> {
        title: m.nazwaModelu, 
        subtitle: `${m.marka}, silnik moc:${m.silnikMoc_KW}`,
        imgUrl: m.mediaCardImg,
        infoBgColor: m.modelBackground
      }
    })
    this.imageGallery = _imageGalleryItemList;
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
