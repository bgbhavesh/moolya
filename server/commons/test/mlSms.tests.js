/**
 * Created by ajiteshkumar on 16/5/17.
 */

import Dinstar from 'dinstar-sms-api';

import mlSms from '../mlSms.js';

describe('mlSms Module', () => {
  before(() => {
  });
  it('should throw error if mobile number is issing', () => {
    expect(() => {
      mlSms.sendSMS(false, 'Way to go, raksan');
    }).to.throw(/To Address\/Message is required/);
  });
  it('should throw error if message is missing', () => {
    expect(() => {
      mlSms.sendSMS('9885069156', false);
    }).to.throw(/To Address\/Message is required/);
  });
  it('should send message', () => {
    const sendSmsStub = Dinstar.prototype.sendSms = sinon.stub();
    mlSms.sendSMS('9885069156', 'Way to go, raksan!!');
    assert.equal(sendSmsStub.calledOnce, false);
    mlSms.sendSMS('8801521564', 'Way to go, raksan!!');
    assert.equal(sendSmsStub.calledOnce, true);
    assert(sendSmsStub.withArgs('8801521564', sinon.match.any, sinon.match.any).calledOnce);
  });
  after(() => {

  });
});
