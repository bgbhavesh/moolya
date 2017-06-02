import {loginContainer} from './loginContainer.js';
var objects = require('../actions/logoutLogEntry');

describe('Login Container Module', function () {
  beforeEach(function () {
     meteorStub = sinon.stub(Meteor,'loginWithPassword');
     logoutStub = sinon.stub(Meteor, 'logout');
  });
  afterEach(function () {
     meteorStub.restore();
     logoutStub.restore();
  });
  it('should fail for a non existing user', function () {
    let username = 'Thor';
    let password = 'asdf1234';
    let result = {
      code : 400,
      error : "true",
      message : "Failed to find user"
    }
    let callback = (result) => {console.log(result)};
    let spy = sinon.spy(callback);
    meteorStub.callsArgWith(2,result);
    loginContainer.login(username,password,spy);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, result);
  });
  it('should return user details for an existing user',function () {
    let username = 'anakha';
    let password = 'asdf1234';
    let result = {
      code : 200,
      success : true,
      message : "Found User"
    }
    let user = {
      profile : {
        name : 'Anakha',
        isInternaluser : true
      }
    }
    let userStub = sinon.stub(Meteor, 'user');
    let callback = (result) => {console.log(result)};
    let spy = sinon.spy(callback);
    userStub.returns(user);
    meteorStub.callsArgWith(2,result);
    loginContainer.login(username,password,spy);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, user);
    userStub.restore();
  });
  it('should logout from moolya backend ',function () {
    let applyStub = sinon.stub(Meteor.logout, 'apply');
    let userStub = sinon.stub(Meteor, 'user');
    let callback = () => {console.log('logout callback')};
    let spy = sinon.spy(callback);
    let user = {
      profile : {
        name : 'Anakha',
        isMoolyaBackend : true
      }
    };
    userStub.returns(user);
    loginContainer.logout(spy);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledOnce(logoutStub);
    sinon.assert.calledOnce(userStub);
    sinon.assert.calledOnce(applyStub);
    applyStub.restore();
    userStub.restore();
  });
  it('should call the callback on logout ',function () {
    let userStub = sinon.stub(Meteor, 'user');
    let callback = () => {console.log('logout callback')};
    let spy = sinon.spy(callback);
    let user = {
      profile : {
        name : 'Anakha',
        isMoolyaBackend : false
      }
    };
    userStub.returns(user);
    loginContainer.logout(spy);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledOnce(logoutStub);
    sinon.assert.calledOnce(userStub);
    userStub.restore();
  });
})
