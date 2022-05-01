import { BrowserWindow } from 'electron';

const fyers = require('fyers-api-v2');

const mongoose = require('mongoose');

const mongoUri =
  'mongodb+srv://faisalakandha:faisalakandha123@cluster0.cd8qa.mongodb.net/rajTrading?retryWrites=true&w=majority';

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Oauth DB Connected Successfully');
  });

const loginSchema = new mongoose.Schema({
  status: String,
  access: String,
});

const Session = mongoose.model('session', loginSchema);

fyers.setAppId('FMR00CRGAK-100');
fyers.setRedirectUrl('http://localhost:3000/');

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

      fyers
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
            const login = new Session({
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
