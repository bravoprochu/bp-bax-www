import { BaxOfertaBranze } from '../enums/bax-oferta-branze-enum';

export interface IBaxModel {
    id: string;
    //branza?: BaxOfertaBranze[];
    branza: string;
    markaId?: number;
    marka?: string;
    nazwaModelu?: string;
}