/*const fyers = require('fyers-api-v2');

class FyersApi {
  constructor(appId: string, redirectUri: string) {
    //appId='appId';
	fyers.setAppId(appId);

    fyers.setRedirectUrl(redirectUri);

    fyers.generateAuthCode();
	console.log('fyers');

  }
}

//var fApi = new FyersApi('XS29344','http://localhost/seller/settings/shop-settings');
*/

class Fyers { 
   //field 
   name:string; 
   clientId:string; 
   secret:string; 
   appId:string; 
   redirectUrl:string;
   password:string;
 
   //constructor 
   constructor(name:string,clientId:string, secret:string,password:string,redirectUrl:string) { 
      this.name = name; 
      this.clientId = clientId; 
	  this.secret = secret; 
	  this.password = password;
      this.redirectUrl = redirectUrl; 	
console.log('Im Inside');	  
   }  
 
   //function 
   display():void { 
      console.log("Employee Name: "+this.name);
   } 
   
//function quotes
   quotes():string{
   async function getQuotes(){
let quotes = new fyers.quotes()
let result = await quotes
    .setSymbol('NSE:ONGC-EQ')
    .getQuotes();
console.log(result)
}
getQuotes()
            }
			
//function holdings
holdings:string(){
fyers.get_holdings().then((response)=>{
        console.log(response)
})

}

			
//function singleOrder
singleOrder:string(){
const reqBody={
   data:{
         "symbol":"NSE:SBIN-EQ",
         "qty":1,
         "type":1,
         "side":-1,
         "productType":"INTRADAY",
         "limitPrice":355,
         "stopPrice":0,
         "disclosedQty":0,
         "validity":"DAY",
         "offlineOrder":"false",
         "stopLoss":0,
         "takeProfit":0
     },

   app_id:"O3E6QXGC72-102",

   token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZnllcnMuaW4iLCJpYXQiOjE2MTc5MDQ3MjUsImV4cCI6MTYxNzkyODI0NSwibmJmIjoxNjE3OTA0NzI1LCJhdWQiOlsieDoyIiwieDoxIiwieDowIiwiZDoxIl0sInN1YiI6ImFjY2Vzc190b2tlbiIsImF0X2hhc2giOiJnQUFBQUFCZ2IwUlZNaDkyRHFOUEFCdmdJeXRibWNxYnFKbldWSkZxRmtwc05QaFlITGIyamtNNkd1TkxCakI5OFYxZ2lwMFpSWkVVYThWU3pndko2M2RkdWFSQ2NyZVpSc2NaN09wd1dyUUZOVXMyeVpwdlNJZz0iLCJkaXNwbGF5X25hbWUiOiJQSVlVU0ggUkFKRU5EUkEgS0FQU0UiLCJmeV9pZCI6IkRQMDA0MDQiLCJhcHBUeXBlIjoxMDIsInBvYV9mbGFnIjoiTiJ9.7kzC37N9FlR6Jod2gTcFtu5otE1RqAZL-TStJB3UNAo"

   }
   const place_order = fyers.place_order(reqBody).then((response) => {

       console.log(response)

   })

}


//function positions
positions:string(){
fyers.get_positions().then((response) => {

    console.log(response)

})


}
        
    
   
   //All function ends 
   
 }
 
  
 
//create an object 
//var fyer = new Fyers('client','secret','password','app','rdr');
 
//access the field 
//console.log("Employee Name: "+obj.name);  
 
//access the function
fyer.display();
fyer.positions();
fyer.singleOrder();
fyer.holdings();
fyer.quotes();
