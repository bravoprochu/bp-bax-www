import { BaxOfertaBranze } from '../enums/bax-oferta-branze-enum';

export interface IBaxModel {
    id: string;
    branza?: BaxOfertaBranze[];
    markaId?: number;
    marka?: string;
    nazwaModelu?: string;
}