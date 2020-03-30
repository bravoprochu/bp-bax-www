import { ICardPersonContactTel } from './i-card-person-contact-tel';
import { BAX_BRANDS } from '../../../shared/enums/bax-brands.enum';

export interface ICardPerson {
    emails: string[];
    firstName?: string;
    iconUrl: string;
    lastName?: string;
    marka?: BAX_BRANDS;
    markaLogoUrl?: string;
    markaLogoBorderInverse?: boolean;
    position?: string;
    telephones: ICardPersonContactTel[];
}