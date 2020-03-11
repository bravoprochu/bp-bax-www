import { Injectable } from '@angular/core';
import { ICardPerson } from '../interfaces/i-card-person';
import { BAX_BRANDS } from '../enums/bax-brands.enum';



@Injectable({
  providedIn: 'root'
})
export class CardPersonService {

  constructor() { }


  baxDealers: ICardPerson[] = [
    {
      emails: ['t.salomon@bax-maszyny.pl'],
      firstName: 'Tomasz',
      lastName: 'Salomon',
      iconUrl: null,
      marka: BAX_BRANDS.Guidetti,
      markaLogoUrl: 'assets/logotypy/1x1/logo_guidetti_signOnly_1x1.png',
      markaLogoBorderInverse: true,
      position: 'Regionalny Kierownik Sprzedaży',
        telephones: [
        {
          number: '502 350 009',
          prefix: '+48'
       }
      ],
    },
    {
      emails: ['f.konowalik@bax-maszyny.pl'],
      firstName: 'Filip',
      lastName: 'Konowalik',
      iconUrl: null,
      marka: BAX_BRANDS.BAX,
      markaLogoUrl: 'assets/logotypy/1x1/logo_bax_signOnly_1x1.png',
      markaLogoBorderInverse: true,
      position: 'Dyrektor techniczny',
        telephones: [
        {
          number: '500 105 422',
          prefix: '+48'
       }
      ],
    },
    {
      emails: ['r.tataruk@bax-maszyny.pl'],
      firstName: 'Robert',
      lastName: 'Tataruk',
      iconUrl: null,
      marka: BAX_BRANDS.BAX,
      markaLogoUrl: 'assets/logotypy/1x1/logo_bax_signOnly_1x1.png',
      markaLogoBorderInverse: true,
      position: 'Kierownik serwisu',
        telephones: [
        {
          number: '513 078 884',
          prefix: '+48'
       }
      ],
    },
    {
      emails: ['k.bereznicki@bax-maszyny.pl'],
      firstName: 'Krzysztof',
      lastName: 'Bereźnicki',
      iconUrl: null,
      marka: BAX_BRANDS.BAX,
      markaLogoUrl: 'assets/logotypy/1x1/logo_bax_signOnly_1x1.png',
      markaLogoBorderInverse: true,
      position: 'Koordynator Działu części zamiennych',
        telephones: [
        {
          number: '508 368 258',
          prefix: '+48'
       }
      ],
    },
    {
      emails: ['f.radlak@bax-maszyny.pl'],
      firstName: 'Filip',
      lastName: 'Radlak',
      iconUrl: null,
      marka: BAX_BRANDS.Arjes,
      markaLogoUrl: 'assets/logotypy/1x1/logo_arjes_signOnly_1x1.png',
      markaLogoBorderInverse: true,
      position: 'Opiekun marki Arjes',
        telephones: [
        {
          number: '513 132 686',
          prefix: '+48'
       }
      ],
    },
    {
      emails: ['k.grodzki@bax-maszyny.pl'],
      firstName: 'Krzysztof',
      lastName: 'Grodzki',
      iconUrl: null,
      marka: BAX_BRANDS.Yanmar,
      markaLogoUrl: 'assets/logotypy/1x1/logo_yanmar_signOnly_1x1.png',
      markaLogoBorderInverse: false,
      position: 'Brand Manager',
      telephones: [
        {
          number: '506 000 100',
          prefix: '+48'
       }
      ],
    },
    {
      emails: ['p.minczykowski@bax-maszyny.pl'],
      firstName: 'Piotr',
      lastName: 'Minczykowski',
      iconUrl: null,
      marka: BAX_BRANDS.Yanmar,
      markaLogoUrl: 'assets/logotypy/1x1/logo_yanmar_signOnly_1x1.png',
      markaLogoBorderInverse: false,
      position: 'Doradca techniczny',
      telephones: [
        {
          number: '501 262 313',
          prefix: '+48'
       }
      ],
    },
    {
      emails: ['m.lewkowicz@bax-maszyny.pl'],
      firstName: 'Mikołaj',
      lastName: 'Lewkowicz',
      iconUrl: null,
      marka: BAX_BRANDS.Sennebogen,
      markaLogoUrl: 'assets/logotypy/1x1/logo_sennebogen_NN_1x1.png',
      markaLogoBorderInverse: false,
      position: 'Opiekun marki, odpowiedzialny za region Śląsk',
        telephones: [
        {
          number: '513 132 688',
          prefix: '+48'
        }
      ],
    },
    {
      emails: ['f.radlak@bax-maszyny.pl'],
      firstName: 'Filip',
      lastName: 'Radlak',
      iconUrl: null,
      marka: BAX_BRANDS.Sennebogen,
      markaLogoUrl: 'assets/logotypy/1x1/logo_sennebogen_NN_1x1.png',
      markaLogoBorderInverse: false,
      position: 'Opiekun marki',
        telephones: [
        {
          number: '513 132 686',
          prefix: '+48'
        }
      ],
    }
    ];
  
  getDelaerByName(name:string): ICardPerson {
    let res: ICardPerson;
    res = [...this.baxDealers].filter(f=>(f.lastName.toLowerCase()).includes(name.toLowerCase()))[0];
    return res;
  }

  getDelaersByNames(names:string[]): ICardPerson[] {
    let res: ICardPerson[] = [];
    names.forEach(name=>{
      let found = this.getDelaerByName(name);
      if(found) {
        res.push(found);
      }
    })
    return res;
  }

  getDelaerByNameSlashMark(nameSlashMark:string): ICardPerson {
    if(!nameSlashMark) {return}
    let slashId =  nameSlashMark.indexOf('/');
    if(!slashId) {return;}

    let name = nameSlashMark.substring(0, slashId);
    let mark = nameSlashMark.substring(slashId+1, nameSlashMark.length);

    let res: ICardPerson;
    res = [...this.baxDealers].filter(f=>(f.lastName.toLowerCase()).includes(name.toLowerCase()) && (BAX_BRANDS[f.marka].toString().toLowerCase()).includes(mark.toLowerCase()))[0];
    return res;
  }


  getDelaersByNamesSlashesMarks(namesSlashesMarks:string[]): ICardPerson[] {
    let res: ICardPerson[] = [];
    namesSlashesMarks.forEach(name=>{
      let found = this.getDelaerByNameSlashMark(name);
      if(found) {
        res.push(found);
      }
    })
    return res;
  }

  getDelaersByMarka(marka:BAX_BRANDS): ICardPerson[] {
    let res: ICardPerson[] = [];
    res = [...this.baxDealers].filter(f=>f.marka == marka);
    
    return res;
  }





}
