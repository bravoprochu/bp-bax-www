import { Injectable } from '@angular/core';
import { IModelSpec } from './interfaces/i-model-spec';
import { BaxMarka } from './enums/bax-marka-enum';
import { baxBaseModelType } from './enums/bax-base-model-type-enum';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor() { }


  getModelList(): IModelSpec[] {
    return this.modelsData;
  }  

  modelsData: IModelSpec[] = [
    {
      marka: BaxMarka.Yanmar,
            media: {
        cardImg: './assets/oferta/modele/yanmar/SV08-1AS.jpg'
      },
      model:'SV08-1AS',
      wymiary: {
        szerokosc_max_mm: 840,
        szerokosc_min_mm: 680,
        wysokosc_min_mm: 2200,
      },
      waga_Kg: 1035,
      typ: baxBaseModelType.mini_koparki_to_do_3_t,
      wysokoscKopania: 1940,
      silnik: {
        mocSilnikaNetto_KW: 7.5,
        silaKopaniaLyzka_kN: 9.95,
        silaKopaniaRamie_kN: 5.88,
        typSilnika: '2TE67L-BV3'
      }
    },
    {
      marka: BaxMarka.Yanmar,
            media: {
        cardImg: './assets/oferta/modele/yanmar/ViO10-2A.jpg'
      },
      model:'ViO10-2A',
      wymiary: {
        szerokosc_max_mm: 1000,
        szerokosc_min_mm: 830,
        wysokosc_min_mm: 2250,
      },
      waga_Kg: 1220,
      typ: baxBaseModelType.mini_koparki_to_do_3_t,
      wysokoscKopania: 2370,
      silnik: {
        mocSilnikaNetto_KW: 9.2,
        silaKopaniaLyzka_kN: 13.7,
        silaKopaniaRamie_kN: 5.6,
        typSilnika: '2TE67L-BV3'
      }
    },
    {
      marka: BaxMarka.Yanmar,
            media: {
        cardImg: './assets/oferta/modele/yanmar/ViO12-4.jpg'
      },
      model:'ViO12-4',
      wymiary: {
        szerokosc_max_mm: 1000,
        szerokosc_min_mm: 830,
        wysokosc_min_mm: 2250,
      },
      waga_Kg: 1235,
      typ: baxBaseModelType.mini_koparki_to_do_3_t,
      wysokoscKopania: 2370,
      silnik: {
        mocSilnikaNetto_KW: 9.2,
        silaKopaniaLyzka_kN: 13.7,
        silaKopaniaRamie_kN: 5.6,
        typSilnika: '2TE67L-BV3'
      }
    },
    {
      marka: BaxMarka.Yanmar,
            media: {
        cardImg: './assets/oferta/modele/yanmar/SV22.jpg'
      },
      model:'SV22',
      wymiary: {
        szerokosc_min_mm: 1380,
        wysokosc_min_mm: 2320,
      },
      waga_Kg: 2260,
      waga_canopy_kg: 2120,
      typ: baxBaseModelType.mini_koparki_to_do_3_t,
      wysokoscKopania: 2760,
      silnik: {
        mocSilnikaNetto_KW: 13.4,
        silaKopaniaLyzka_kN: 18.6,
        silaKopaniaRamie_kN: 11.8,
        typSilnika: '3TNV76-SBVA2'
      }
    },
    {
      marka: BaxMarka.Yanmar,
            media: {
        cardImg: './assets/oferta/modele/yanmar/SV26.jpg'
      },
      model:'SV26',
      wymiary: {
        szerokosc_min_mm: 1550,
        wysokosc_min_mm: 2435,
      },
      waga_Kg: 2740,
      waga_canopy_kg: 2600,
      typ: baxBaseModelType.mini_koparki_to_do_3_t,
      wysokoscKopania: 2835,
      silnik: {
        mocSilnikaNetto_KW: 17.6,
        silaKopaniaLyzka_kN: 24.5,
        silaKopaniaRamie_kN: 14.5,
        typSilnika: '3TNV82A-BPBVA'
      }
    },


//sennek

    {
      marka: BaxMarka.Sennebogen,
      media: {
        cardImg: './assets/oferta/modele/sennebogen/355E.jpg'
      },
      model:'355E',
      wymiary: {
        szerokosc_min_mm: 1550,
        wysokosc_min_mm: 2435,
      },
      waga_Kg: 2740,
      waga_canopy_kg: 2600,
      typ: baxBaseModelType.mini_koparki_to_do_3_t,
      wysokoscKopania: 2835,
      silnik: {
        mocSilnikaNetto_KW: 17.6,
        silaKopaniaLyzka_kN: 24.5,
        silaKopaniaRamie_kN: 14.5,
        typSilnika: 'dane zenka'
      }
    },

  ]
}
