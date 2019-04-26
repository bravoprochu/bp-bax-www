import { IContactTel } from './i-contact-tel';

export interface IContactCard {
    title: string;
    subtitle?: string;
    telephones: IContactTel[]
    emails: string[];
    iconUrl: string;
}