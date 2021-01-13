export const WWW_SERVER = 'https://www.bdotp.pl/';
export const API_SERVER = 'https://bax-api.azurewebsites.net/api';

export const environment = {
  production: true,

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
