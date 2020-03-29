import { IContactTel } from './i-contact-tel';

export interface IContactCard {
    firstName?: string;
    lastName?: string;
    position?: string;
    title?: string;
    subtitle?: string;
    telephones: IContactTel[]
    emails: string[];
    iconUrl: string;
}