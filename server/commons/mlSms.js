
/**
 * Created by mohammed.mohasin on 14/04/17.
 */

//FIXME: this is just for the Pilot and Dry runs, to be made live once in Production
var whiteList = ["8801521564","9985786859"];

class MlSms{

  constructor(){
    if(! MlSms.instance){
      MlSms.instance = this;
    }
    this.sendSMS.bind(this);
    return MlSms.instance;
  }

    sendSMS(to,msg){
       if(!to || !msg) new Error("To Address/Message is required");
          // to = extractNumber(to);
         var whiteListed = false;
             to = to.trim();
        if (to.length > 9) {
            for (var i = whiteList.length - 1; i >= 0; i--) {
                   var wn = whiteList[i];
                    if (to.indexOf(wn) !== -1 || wn.indexOf(to) !== -1) {
                         whiteListed = true;
                         break;
                    }
            }
         }

      if (whiteListed) {
       // var reportId = bulkSms.sendSMS({to: to, message: msg});
       // return reportId;
      }
    }
}

const mlSms = new MlSms();
Object.freeze(mlSms);

export default mlSms;

