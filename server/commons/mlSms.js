
/**
 * Created by mohammed.mohasin on 14/04/17.
 */

import Dinstar  from  'dinstar-sms-api';
//FIXME: this is just for the Pilot and Dry runs, to be made live once in Production
var whiteList = ["8801521564","9985786859"];

var smsOptions = {
  username:"rsadmin",
  password:"ahwwpgd",
  port:0
};
var isWhiteListEnabled=Meteor.settings.private.smsConfig.isWhiteListEnabled;
var apiBase = 'smsapi.moolya.in:30880';

class MlSms{

  constructor(){
    if(! MlSms.instance){
      MlSms.instance = this;
    }
    this.sendSMS.bind(this);
    this.sendSMSIntl.bind(this);
    return MlSms.instance;
  }

  sendSMS(to,msg){
      if(!to || !msg) new Error("To Address/Message is required");
      var whiteListed = false;
      to = to.trim();
      if(isWhiteListEnabled){
          for (var i = whiteList.length - 1; i >= 0; i--) {
            var wn = whiteList[i];
            if (to.indexOf(wn) !== -1 || wn.indexOf(to) !== -1) {
             whiteListed = true;
              break;
           }
        }
      }

    if(!isWhiteListEnabled){whiteListed=true};

    if (whiteListed) {
      let smsApi=new Dinstar(apiBase,smsOptions.username,smsOptions.password);
      let result=smsApi.sendSms(to,msg,smsOptions.port);
    }
  }

    sendSMSIntl(countryCode,number,msg){
         //extract countryCode
      let country=mlDBController.findOne('MlCountries',{$or:[{"_id":countryCode},{"countryCode":countryCode}]});
      let countryPhoneNumberCode=country&&country.phoneNumberCode?country.phoneNumberCode:null;
      if(number&&countryPhoneNumberCode){
         let to=countryPhoneNumberCode.trim()+number.trim();
         this.sendSMS(to,msg);
      }
    }
}

const mlSms = new MlSms();
Object.freeze(mlSms);

export default mlSms;

