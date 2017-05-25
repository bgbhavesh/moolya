import MlAuthorization from '../mlAuthorization.js';

const MlDBController = require('../../commons/mlDBController');

describe('Verify Authorization Module ',function(){
  beforeEach(function (){
    dbstubs = sinon.stub(MlDBController.prototype, 'findOne');
    MlAuth = new MlAuthorization();
   });
  afterEach( function(){
    dbstubs.restore();
   });

  it('should fail if the action code is not present in db ', function(){

    let req= {};
    let response = MlAuth.validteAuthorization("102","bakery","sell",req);
    dbstubs.returns(null);
    expect(response).to.be.equal(false);
  });

  it('should fail if the module code is not present in db', function(){

    let module = "skatering";
    let action = "sell";
    let req = {};
    dbstubs.onCall(0).returns(action); //On First call of the stub
    dbstubs.onCall(1).returns(null);   //On Second call of the stub
    let response = MlAuth.validteAuthorization("103", module,action,req);
    expect(response).to.be.equal(false);
  });

  it('should fail if the user is not present in the db ', function(){

    let action = "sell";
    let module = "bakery";
    let req = {};
    dbstubs.onCall(0).returns(action);
    dbstubs.onCall(1).returns(module);
    dbstubs.onCall(2).returns(null);
    let response = MlAuth.validteAuthorization("103333",module,action,req);
    expect(response).to.be.equal(false);
  });

  it('should succeed if the listed role allows requested action for an internal user', function(){

    let action = "sell";
    let module = "bakery";
    let req = {};
    let user = {};
    user.profile = {
      isInternaluser: true,
      InternalUprofile : {
        moolyaProfile: {
          userProfiles: [
            {
              userRoles: [ {roleId : 102},{roleId : 22} ],
              isDefault: true
            }
          ]
        }
      }
    }
    dbstubs.onFirstCall().returns(action);
    dbstubs.onSecondCall().returns(module);
    dbstubs.onThirdCall().returns(user);
    let validateStub = sinon.stub(MlAuthorization.prototype, 'validateRole');
    validateStub.returns(true);
    let response = MlAuth.validteAuthorization("103",module,action,req);
    expect(response).to.be.equal(true);
    validateStub.restore();
  });

  it('should fail for non default user role of an internal user', function(){

    let action = "sell";
    let module = "bakery"
    let user = {};
    user.profile = {
      isInternaluser: true,
      InternalUprofile : {
        moolyaProfile: {
          userProfiles: [
            {
              userRoles: [ {roleId : 102},{roleId : 22} ],
              isDefault: false
            }
          ]
        }
      }
    }
    let req = {};
    dbstubs.onFirstCall().returns(action);
    dbstubs.onSecondCall().returns(module);
    dbstubs.onThirdCall().returns(user);
    let response = MlAuth.validteAuthorization("103",module,action,req);
    expect(response).to.be.equal(false);
  });

  it('should fail if the requested action is invalid for a given internal user role', function(){

    let action = "sell";
    let module = "bakery";
    let user = {};
    user.profile = {
      isInternaluser: true,
      InternalUprofile : {
        moolyaProfile: {
          userProfiles: [
            {
              userRoles: [{roleId: 1000},{roleId:123}],
              isDefault: true
            }
          ]
        }
      }
    }
    let req = {};
    dbstubs.onCall(0).returns(action);
    dbstubs.onCall(1).returns(module);
    dbstubs.onCall(2).returns(user);
    let validateStub = sinon.stub(MlAuthorization.prototype, 'validateRole');
    validateStub.returns(false);
    let response = MlAuth.validteAuthorization("103",module,"destroy",req);
    expect(response).to.be.equal(false);
    validateStub.restore();
  });

});
