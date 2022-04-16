import { BrowserWindow } from 'electron';

const Store = require('electron-store');
const fyers = require('fyers-api-v2');

const store = new Store();

fyers.setAppId('FMR00CRGAK-100');
fyers.setRedirectUrl('http://localhost:3000/');

const authUrl =
  'https://api.fyers.in/api/v2/generate-authcode?client_id=FMR00CRGAK-100&redirect_uri=http://localhost:3000/&response_type=code&state=sample_state';

const authWindow = new BrowserWindow({
  width: 800,
  height: 600,
  show: false,
  'node-integration': false,
});

authWindow.loadURL(authUrl);
authWindow.show();

authWindow.webContents.on('will-navigate', function (event, newUrl) {
  const raw_code = /auth_code=([^&]*)/.exec(newUrl);
  const code = raw_code && raw_code.length > 1 ? raw_code[1] : null;

  const reqBody = {
    auth_code: code,
    secret_key: 'DCMSA80T3E',
  };

  const token = fyers
    .generate_access_token(reqBody)
    .then((response) => {
      return response.access_token;
    })
    .catch(function () {
      console.log('Promise Rejected');
    });

  token
    .then(async () => {
      const d = await token;
      store.set('access_token', d);
    })
    .catch(() => {
      console.log('Promise Rejected');
    });
});
