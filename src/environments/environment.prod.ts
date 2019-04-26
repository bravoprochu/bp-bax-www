export const BP_SERVER_URL = 'https://www.bdotp.pl/';
export const BP_BAX_AZURE_API = 'https://bax-api.azurewebsites.net/api';

export const environment = {
  production: true,

  imageFolder: `${BP_SERVER_URL}/assets/images`,

  colorArjes: '#FF5E0E',
  colorBax: '#0054A6',
  colorSennebogen: '#4DAA2B',
  colorZemler: '#007843',
  colorYanmar: '#E30020',

  maszynyNowe: {
    apiUrlMaszynyNoweGetList: `${BP_BAX_AZURE_API}/maszynyNowe`,
    apiUrlMaszynyNoweGeById: `${BP_BAX_AZURE_API}/maszynyNowe/`,
  },
  news: {
    apiUrlNewsList:  `${BP_BAX_AZURE_API}/news`,
    apiUrlNewsGetById:  `${BP_BAX_AZURE_API}/news`,
  },
  serverUrl: BP_SERVER_URL,
  dns: 'https://bax-maszyny.pl'

};
