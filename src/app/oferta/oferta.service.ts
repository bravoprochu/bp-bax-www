import { Injectable } from '@angular/core';
import { BaxMarka } from './enums/bax-marka-enum';
import { baxBaseModelType } from './enums/bax-base-model-type-enum';

import { IBaxModelSpec } from './interfaces/i-bax-model-spec';
import { BAX_MODEL_SPEC_LIST } from './data/bax-model-spec-list';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor() { 
    this.UpdateMediaImgUrl(BAX_MODEL_SPEC_LIST);
    //console.table(this.getModelList().forEach(f=>f.mediaCardImg));
    //console.log(this.getModelList().forEach(f=>f.mediaCardImg));
  }


  getModelList(): IBaxModelSpec[] {
    const data = BAX_MODEL_SPEC_LIST;
    return data;
  }

  private UpdateMediaImgUrl(modelList: IBaxModelSpec[]) {
    modelList.forEach(f => {
      if (f.mediaCardImg) {
        const _mediaCardImg = f.mediaCardImg.trim();
        f.mediaCardImg = `./assets/oferta/modele/${f.marka.trim().toLowerCase()}/${_mediaCardImg}`
      } else {
        f.mediaCardImg = './assets/svg/logotypy/logo_bax_signOnly.svg';
      };
    }
    );
  }
}
