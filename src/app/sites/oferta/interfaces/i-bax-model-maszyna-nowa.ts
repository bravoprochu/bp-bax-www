import { IBaxModel } from './i-bax-model';
import { IBaxModelMedia } from './i-bax-model-media';

export interface IBaxModelMaszynaNowa extends IBaxModel, IBaxModelMedia {
    rodzajUrzadzenia?: string;
    seria?: string;
    dlugosc_mm?: number;
    szerokosc_mm?: number;
    szerokoscMin_mm?: number;
    wysokosc_mm?: number;
    szerokoscGasienic_mm?: number;
    szerokoscPrzyOgumieniu_mm?: string;
    rozstawGasienic_mm?: number;
    rozstawGasienicMin_mm?: number;
    waga_kg?: number;
    rodzajRamienia?: string;
    rodzajOgumienia?: string;
    glebokoscKopania_mm?: number;
    zasiegKopania_mm?: number;
    wysokoscWysypu_mm?: number;
    udzwigNaLyzce_kN?: string;
    udzwigNaWidlachDoPalet?: number;
    silnikTyp?: string;
    silnikMoc_KW?: number;
    silnikPojemnosc_cm3?: number;
    cisnieniePomp_bar?: number;
    iloscPompZebatych?: number;
    wydajnoscPompZebatych_lmin?: number;
    iloscPompWielotloczkowych?: number;
    wydajnoscPompWielotloczkowych_lmin?: number;
    predkoscJazdy_kmh?: number;
    predkoscObrotu_rpm?: number;
    mocKopaniaRamie_KN?: number;
    mocKopaniaLyzka_KN?: number;
    liczbaRolek?: number;
    liczbaRolekDol?: number;
    systemNaciaganiaGasienic?: string;
    przeswit_mm?: number;
    zbiornikPaliwa_l?: number;
    plynChlodzacy_l?: number;
    olejSilnikowy_l?: number;
    plynUkladHydrauliczny_l?: number;
    okresGwarancji_msc?: number;
    okresGwarancji_mtg?: number;
    czyKlimatyzacja?: boolean;
    czestotliwoscSerwisu_mtg?: number;
    dokumentacja?: string;
    czyFinansowanieFabryczne0Procent?: string;
    czyOdbiorWlasny?: string;
    rodzajeLyzek?: string;
    inneOsprzety?: string;
    zasięg_roboczy_m?: number;
    udzwig_na_max_zasięgu_kg?: number;
    podwozie?: string;
    rodzaj_osprzetu_roboczego?: string;
    pojemność_chwytaka_5_palczastego_gestość_2t_m3_l?: number;
    pojemność_chwytaka_lupinowego_gestość_2t_m3_l?: number;
    pojemność_chwytaka_szczekowego_drewno_dl_2m_m3?: number;
    zasilanie?: string;
}