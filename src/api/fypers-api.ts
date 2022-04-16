const fyers = require('fyers-api-v2');
const Store = require('electron-store');

const store = new Store();

fyers.setAppId('FMR00CRGAK-100');

const accessToken = store.get('access_token');

console.log(accessToken);

fyers.setAccessToken(accessToken);

// Get All Positions of the Current Day
fyers.get_positions().then((response) => {
  console.log(response);
});

// Single Order Box

const reqBody = {
  // Request Body Needs to be Dynamic Based on User Input

  symbol: 'NSE:SBIN-EQ',
  qty: 1,
  type: 1,
  side: -1,
  productType: 'INTRADAY',
  limitPrice: 355,
  stopPrice: 0,
  disclosedQty: 0,
  validity: 'DAY',
  offlineOrder: 'false',
  stopLoss: 0,
  takeProfit: 0,
};

//Invoke Order

/**
const place_order = fyers.place_order(reqBody).then((response) => {
  console.log(response);
});
**/
