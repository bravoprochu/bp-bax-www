import { IContactCard } from '../interfaces/i-contact-dzial';


export const CONTACT_LIST: IContactCard[] = [
    {
        title: 'sekretariat',
        emails: ['bax@bax-maszyny.pl'],
        iconUrl: '/assets/svg/contact/bax_icon_sekretariat.svg',
        telephones: [
            {
                prefix: 'tel.',
                number: '+48 61 828 33 66',
            }
        ]
    },
    {
        title: 'serwis',
        emails: ['serwis@bax-maszyny.pl'],
        iconUrl: '/assets/svg/contact/bax_icon_serwis.svg',
        telephones: [
            {
                prefix: 'tel.',
                number: '+48 513 078 884'
            },
            {
                prefix: 'tel.',
                number: '+48 500 105 422'
            },
            {
                prefix: 'tel.',
                number: '+48 501 262 060'
            }
        ]
    },
    {
        title: 'części',
        emails: ['czesci@bax-maszyny.pl'],
        iconUrl: '/assets/svg/contact/bax_icon_czesci.svg',
        telephones: [
            {
                prefix: 'tel.',
                number: '+48 61 828 16 47',
            },
            {
                prefix: 'tel.',
                number: '+48 508 368 258'
            }
        ]
    },
    {
        title: 'księgowość',
        emails: ['ksiegowosc@bax-maszyny.pl'],
        iconUrl: '/assets/svg/contact/bax_icon_ksiegowosc.svg',
        telephones: [
            {
                prefix: 'tel.',
                number: '+48 618 283 366',
            }
        ]
    },

]