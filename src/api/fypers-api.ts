const fyers = require('fyers-api-v2');

class FyersApi {
  constructor(appId: string, redirectUri: string) {
    fyers.setAppId(appId);

    fyers.setRedirectUrl(redirectUri);

    fyers.generateAuthCode();

  }
}
