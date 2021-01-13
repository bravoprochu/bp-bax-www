import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBaxModelMaszynaNowa } from '../../interfaces/i-bax-model-maszyna-nowa';
import { environment } from 'src/environments/environment';
import { map, tap, delay } from 'rxjs/operators';
import { BaxMarka } from '../../enums/bax-marka-enum';
import { MaszynyNoweServicesModule } from './maszyny-nowe-services.module';

@Injectable({
  providedIn: MaszynyNoweServicesModule
})
export class MaszynyNoweDataFactoryService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getHeaders() {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': environment.serverUrl
    })
  }


  getList(): Observable<IBaxModelMaszynaNowa[]> {
    return <Observable<IBaxModelMaszynaNowa[]>>this.httpClient.get(environment.maszynyNowe.apiUrlMaszynyNoweGetList, { headers: this.getHeaders() })
      .pipe(
        map(this.UpdateMediaImgUrlArr),
      )
  }

  getById(id: string): Observable<IBaxModelMaszynaNowa> {
    return <Observable<IBaxModelMaszynaNowa>>this.httpClient.get(`${environment.maszynyNowe.apiUrlMaszynyNoweGeById}/${id}`, { headers: this.getHeaders()})
      .pipe(
        map(UpdateMediaImgUrl)
      )
  }



  private UpdateMediaImgUrlArr(modelList: IBaxModelMaszynaNowa[]) {
    modelList.forEach(UpdateMediaImgUrl);
    return modelList;
  }
  
}


export function UpdateMediaImgUrl(model: IBaxModelMaszynaNowa) {
  if(!model) {return;}
  if (model.mediaCardImg) {
    const _mediaCardImg = model.mediaCardImg.trim();
    model.mediaCardImg = `./assets/oferta/modele/${model.marka.trim().toLowerCase()}/${_mediaCardImg}`
  } else {
    model.mediaCardImg = './assets/svg/logotypy/logo_bax_signOnly.svg';
  };

  const logotypUrl = "./assets/svg/logotypy";

  switch (model.markaId) {
    case BaxMarka.Yanmar:
      model.modelBackground = environment.colorYanmar;
      model.modelLogo = `${logotypUrl}/logo_yanmar.svg`;
      break;

    case BaxMarka.Sennebogen:
      model.modelBackground = environment.colorSennebogen;
      model.modelLogo = `${logotypUrl}/logo_sennebogen.svg`;
      break;

    case BaxMarka.Arjes:
      model.modelBackground = environment.colorArjes;
      model.modelLogo = `${logotypUrl}/logo_yanmar.svg`;
      break;

    case BaxMarka.Zemmler:
      model.modelBackground = environment.colorZemler
      break;
  }
  return model;
}


