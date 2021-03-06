// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const WWW_SERVER = 'https://www.bdotp.pl/';
export const API_SERVER = 'https://localhost:17441/api';


export const environment = {
  production: false,

  imageFolder: `${WWW_SERVER}/assets/images`,

  colorArjes: '#FF5E0E',
  colorBax: '#0054A6',
  colorSennebogen: '#4DAA2B',
  colorZemler: '#007843',
  colorYanmar: '#E30020',

  maszynyNowe: {
    apiUrlMaszynyNoweGetList: `${API_SERVER}/maszynyNowe`,
    apiUrlMaszynyNoweGeById: `${API_SERVER}/maszynyNowe/`,
  },
  news: {
    apiUrlNewsList:  `${API_SERVER}/news`,
    apiUrlNewsGetById:  `${API_SERVER}/news`,
  },
  serverUrl: WWW_SERVER,
  dns: 'https://bax-maszyny.pl'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
