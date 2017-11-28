
/**
 * Created by mohammed.mohasin on 14/04/17.
 */

import Dinstar from 'dinstar-sms-api';
// FIXME: this is just for the Pilot and Dry runs, to be made live once in Production
// var whiteList = ["9503777162","8686556168","9885794747","8801521564","9985786859","9999104696","8374448883","7036158859","9490353380","8019650414","7416466589","8748947339","7330867711","9849665462","9490353380", "7503726967"];
const whiteList = ['8801521564'];


const smsOptions = {
  username: 'rsadmin',
  password: 'ahwwpgd',
  port: 0
};

const isWhiteListEnabled = Meteor.settings.private.smsConfig.isWhiteListEnabled;
const apiBase = 'smsapi.moolya.in:30880';

class MlSms {
  constructor() {
    if (!MlSms.instance) {
      MlSms.instance = this;
    }
    this.sendSMS.bind(this);
    this.send.bind(this);
    return MlSms.instance;
  }

  sendSMS(to, msg) {
    if (!to || !msg) { throw new Error('To Address/Message is required'); }
    let whiteListed = false;
    to = to.trim();
    if (isWhiteListEnabled) {
      for (let i = whiteList.length - 1; i >= 0; i--) {
        const wn = whiteList[i];
        if (to.indexOf(wn) !== -1 || wn.indexOf(to) !== -1) {
          whiteListed = true;
          break;
        }
      }
    }

    if (!isWhiteListEnabled) { whiteListed = true }

    if (whiteListed) {
      const smsApi = new Dinstar(apiBase, smsOptions.username, smsOptions.password);
      const result = smsApi.sendSms(to, msg, smsOptions.port);
    }
  }

  send(countryCode, number, msg) {
    // extract countryCode
    const country = mlDBController.findOne('MlCountries', { $or: [{ _id: countryCode }, { countryCode }] });
    const countryPhoneNumberCode = country && country.phoneNumberCode ? country.phoneNumberCode : null;
    if (number && countryPhoneNumberCode) {
      const to = countryPhoneNumberCode.trim() + number.trim();
      this.sendSMS(to, msg);
    } else {
      console.log('Failed to send Sms as number/country code is invalid');
    }
  }
}

const mlSms = new MlSms();
Object.freeze(mlSms);

export default mlSms;

