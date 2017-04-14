
/**
 * Created by mohammed.mohasin on 14/04/17.
 */
class MlSms{

  constructor(){
    if(! MlSms.instance){
      MlSms.instance = this;
    }
    return MlSms.instance;
  }
}

const mlSms = new MlSms();
Object.freeze(mlSms);

export default mlSms;

