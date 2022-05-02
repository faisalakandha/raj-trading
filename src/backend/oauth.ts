import { BrowserWindow } from 'electron';

import fy from '../api/index';

import db from '../backend/models/index';

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Oauth DB Connected Successfully');
  });


fy.fyers.setAppId(fy.fyId);
fy.fyers.setRedirectUrl(fy.url);

export default async function AuthWindow() {
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

  authWindow.webContents.session.clearStorageData();

  return new Promise((resolve, reject) => {
    authWindow.webContents.on('will-navigate', function (event, newUrl) {
      const raw_code = /auth_code=([^&]*)/.exec(newUrl);
      const code = raw_code && raw_code.length > 1 ? raw_code[1] : null;

      const reqBody = {
        auth_code: code,
        secret_key: 'DCMSA80T3E',
      };

      fy.fyers
        .generate_access_token(reqBody)
        .then((response) => {
          return response;
        })
        .catch(function () {
          return;
          console.log('Promise Rejected');
        })

        .then((AuthToken) => {
          if (AuthToken.s === 'ok') {
            const login = new db.Session({
              status: AuthToken.s,
              access: AuthToken.access_token,
            });
            login.save();
            resolve(true);
            authWindow.close();
          }
        })
        .catch('Authentication Steps Exception');
    });
  }).catch('Auth Failed');
}
