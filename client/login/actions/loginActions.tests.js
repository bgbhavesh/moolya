import {loginActionHandler} from './loginActions.js';
import MoolyaloginContainer from '../containers/loginContainer'

describe('Login Actions Module', function () {
    beforeEach(function () {
      FlowStub = sinon.stub(FlowRouter, 'redirect');
      loginStub = sinon.stub(MoolyaloginContainer.loginContainer, 'login');
    });
    afterEach(function () {
      loginStub.restore();
      FlowStub.restore();
    });

   it('should take the admin route for an internal user', function () {
      let msg;
      const callback = (message) => {msg = message};
      let details ={
        username: 'anakhar.22@gmail.com',
        password: '1234!@#$'
      };
      let user = {
        profile : {
          name : 'Anakha',
          isInternaluser : true
        }
      }
      let path = "/admin";
      loginStub.callsArgWith(2,user);
      loginActionHandler.onLoginFormSubmit(details,callback);
      sinon.assert.calledOnce(FlowStub);
      sinon.assert.calledWith(FlowStub, path);
   });

   it('should take the app route for an external user', function () {
     let msg;
     const callback = (message) => {msg = message};
     let details ={
       username: 'anakhar.22@gmail.com',
       password: '1234!@#$'
     };
     let user = {
       profile : {
         name : 'Anakha',
         isExternaluser : true
       }
     }
     let path = "/app";
     loginStub.callsArgWith(2,user);
     loginActionHandler.onLoginFormSubmit(details,callback);
     sinon.assert.calledOnce(FlowStub);
     sinon.assert.calledWith(FlowStub, path);
   });

   it('should not allow an invalid user', function () {
     const callback = (message) => {console.log("Invalid sign-in")};
     let spy = sinon.spy(callback);
     let details ={
       username: 'thor.asgard@gmail.com',
       password: '1234!@#$'
     };
     let error = {
        error : 404,
        reason : "Invalid user"
     }
     let message = "Invalid user";
     loginStub.callsArgWith(2,error);
     loginActionHandler.onLoginFormSubmit(details,spy);
     sinon.assert.calledOnce(spy);
     sinon.assert.calledWith(spy, message);
   });

  it('should log out the user', function () {
    let logoutStub = sinon.stub(MoolyaloginContainer.loginContainer, 'logout');
    const callback = () => {console.log("Logging out")};
    let spy = sinon.spy(callback);
    logoutStub.callsArg(0);
    loginActionHandler.onLogout(spy);
    sinon.assert.calledOnce(spy);
    logoutStub.restore();
  });

});
