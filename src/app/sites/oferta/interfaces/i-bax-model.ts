import { BaxOfertaBranze } from '../enums/bax-oferta-branze-enum';

export interface IBaxModel {
    id: string;
    branza: string;
    branzaList: string[];
    markaId?: number;
    marka?: string;
    markaList: string[],
    nazwaModelu?: string;
    zasilanieList: string[];
}