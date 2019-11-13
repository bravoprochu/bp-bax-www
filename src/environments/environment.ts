// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const BP_SERVER_URL_Local = 'http://localhost:4200/';
export const BP_BAX_LOCAL_BACKEND = 'https://localhost:17441/api';



export const environment = {
  production: false,

  imageFolder: '/assets/images',
  
  
  colorArjes: '#FF5E0E',
  colorBax: '#0054A6',
  colorSennebogen: '#4DAA2B',
  colorZemler: '#007843',
  colorYanmar: '#E30020',


  maszynyNowe: {
    apiUrlMaszynyNoweGetList: `${BP_BAX_LOCAL_BACKEND}/maszynyNowe`,
    apiUrlMaszynyNoweGeById: `${BP_BAX_LOCAL_BACKEND}/maszynyNowe`,
  },
  news: {
    apiUrlNewsList:  `${BP_BAX_LOCAL_BACKEND}/news`,
    apiUrlNewsGetById:  `${BP_BAX_LOCAL_BACKEND}/news`,
  },
  serverUrl: BP_SERVER_URL_Local,
  dns: 'https://localhost:4200'


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
