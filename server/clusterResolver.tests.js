/**
 * Created by Shubhankit on 27/5/17.
 */

import MlResolver from './commons/mlResolverDef';
import MlAuthorization from './mlAuthorization/mlAuthorization'
import ClusterResolver from './MlInternalUsers/admin/clusters/clusterResolver'

//Need to import the communityResolver file because the functions of this file needs to be defined 
//already for the test cases to run
import {} from './MlInternalUsers/admin/community/communityResolver';
import MlRespPayload from './commons/mlPayload'

//Need to import the collections since collections are not loaded when the test file starts
import {} from '../lib/collections/admin/mlClusters'
import geocoder from 'geocoder';
import MlDBController from './commons/mlDBController'
import MlEmailNotification from './mlNotifications/mlEmailNotifications/mlEMailNotification'

//To be used by the clusterResolver.js since the test file runs even before the clusterResolver.js starts
//and it does not have the MlAuthorization instance.
mlAuthorization = new MlAuthorization(); 
mlDbcontroller = new MlDBController();

describe('clusterResolver Module for createCluster', function(){
  before(function(){
    mlDbInsertStub = sinon.stub(mlDBController, 'insert');
    mlResolverStub = sinon.stub(MlResolver.MlMutationResolver, 'createCommunityAccess');
  });
  beforeEach(function(){
    mldbfoStub = sinon.stub(MlAuthorization.prototype, 'validteAuthorization');
    mlPayloadStub = sinon.stub(MlRespPayload.prototype, 'errorPayload');
    mlDbcontroller = sinon.stub(mlDBController, 'find');
  })
  afterEach(function(){
    mldbfoStub.restore();
    mlPayloadStub.restore();
    mlDbcontroller.restore();
  });
  after(function(){
    mlDbInsertStub.restore();
    mlResolverStub.restore();
  })
  it('should return error respose for non authorized user', function(){
      mldbfoStub.returns(false);
      mlPayloadStub.returns(false);
      var obj = {};
      var context = 'context';
      var cluster = 'clusterValue';
      var info = {};
      var fn = MlResolver.MlMutationResolver['createCluster'](obj, {cluster:cluster, moduleName:"CLUSTER", actionName:"CREATE"}, context, info)
      expect(fn).to.be.equal(false);// using `false` value for now, but it should be a error response object
  });

  it('should return error response for already existing user', function(){
    mldbfoStub.returns(true);
    mlPayloadStub.returns(true);
    var obj = {};
    var user =
      {
      _id: '21212',
        count: ()=>{
        return 10;
        }
    }
    var context = 'context';
    var cluster = 'clusterValue';
    var info = {};
    mlDbcontroller.returns(user);
    var fn = MlResolver.MlMutationResolver['createCluster'](obj, {cluster:cluster, moduleName:"CLUSTER", actionName:"CREATE"}, context, info)
    expect(fn).to.be.equal(true); // using `true` value for now, but it should be a error response object
  });

  it('should verify that the geocode function executes only one time', function(){
    mlDbGeoCode = sinon.stub(geocoder, 'geocode');
    mldbfoStub.returns(true);
    mlPayloadStub.returns(true);
    var obj = {};
    var user =
      {
        _id: '21212',
        count: ()=>{
          return 0;
        }
      }
    var context = 'context';
    var cluster = 'clusterValue';
    var info = {};
    mlDbcontroller.returns(user);
    var fn = MlResolver.MlMutationResolver['createCluster'](obj, {cluster:cluster, moduleName:"CLUSTER", actionName:"CREATE"}, context, info)
    assert(mlDbGeoCode.calledOnce);
    mlDbGeoCode.restore();
  });

  it('should verify that the geocode function executes successfully', function(){
    mldbfoStub.returns(true);
    mlPayloadStub.returns(true);
    var obj = {};
    var id = '123';
    var user =
      {
        _id: '21212',
        count: ()=>{
          return 0;
        }
      }
    var cluster = {
      countryId : "c1",
      countryCode : "AF",
      countryName : "Afghanistan",
      clusterName : "Afghanistan",
      displayName : "Afghanistan",
      url : "https://s3.ap-south-1.amazonaws.com/moolya-app-images/countries-flag/small/Afghanistan.png",
      isActive : true,
      lat : "",
      lng : "",
      capital : "KABUL",
      about : "ABOUT",
      showOnMap: false
    }
    var context = 'context';
    var info = {};
    mlDbcontroller.returns(user);
    mlDbInsertStub.returns(id);
    mlResolverStub.returns(id);
    // var fn = MlResolver.MlMutationResolver['createCluster'](obj, {cluster:cluster, moduleName:"CLUSTER", actionName:"CREATE"}, context, info)
    // sinon.assert.calledOnce(mlResolverStub);
    //commenting this as we need to take care of this issue by discussing with ajitest
  });
});

describe('clusterResolver Module for upsertCluster', function(){
  before(function(){
    mlNotifyStub = sinon.stub(MlEmailNotification, 'clusterVerficationEmail');
  });
  beforeEach(function(){
    mldbfoStub = sinon.stub(MlAuthorization.prototype, 'validteAuthorization');
    mlErrorPayloadStub = sinon.stub(MlRespPayload.prototype, 'errorPayload');
    mlSuccessPayloadStub = sinon.stub(MlRespPayload.prototype, 'successPayload');
    mlDbFindOneStub = sinon.stub(mlDBController, 'findOne');
    mlDbUpdateStub = sinon.stub(mlDBController, 'update');
  })
  afterEach(function(){
    mldbfoStub.restore();
    mlErrorPayloadStub.restore();
    mlSuccessPayloadStub.restore();
    mlDbFindOneStub.restore();
    mlDbUpdateStub.restore();
  });
  after(function(){
    mlNotifyStub.restore();
  })
  it('should return error respose for non authorized user', function(){
      mldbfoStub.returns(false);
      mlErrorPayloadStub.returns(false);
      var obj = {};
      var args = 'xyz';
      var context = 'uyw';
      var cluster = 'siudsi';
      var info = {};
      var fn = MlResolver.MlMutationResolver['upsertCluster'](obj, {cluster:cluster, moduleName:"CLUSTER", actionName:"UPDATE"}, context, info)
      expect(fn).to.be.equal(false);
  });

  it('should return the success payload if clusterId is present in DB', function(){
    mldbfoStub.returns(true);
    mlSuccessPayloadStub.returns(true);
    var obj = {};
    var cluster = {
        countryId : "c1",
        countryCode : "AF",
        countryName : "Afghanistan",
        clusterName : "Afghanistan",
        displayName : "Afghanistan",
        url : "https://google.com",
        isActive : true,
        lat : "",
        lng : "",
        capital : "KABUL",
        about : "ABOUT",
        showOnMap: true,
        status: {
          code: 110
        }
    }
    var user =
      {
      _id: '21212',
        count: ()=>{
        return 10;
        }
    }
    var context = 'uyw';
    var info = {};
    mlDbFindOneStub.returns(cluster);
    mlDbUpdateStub.returns(cluster);
    var fn = MlResolver.MlMutationResolver['upsertCluster'](obj, {cluster:cluster, moduleName:"CLUSTER", actionName:"UPDATE"}, context, info)
    expect(fn).to.be.equal(true); 
  });

  it('should verify that the clusterVerficationEmail function executes only once', function(){
    mldbfoStub.returns(true);
    mlSuccessPayloadStub.returns(true);
    var obj = {};
    var cluster = {
        countryId : "c1",
        countryCode : "AF",
        countryName : "Afghanistan",
        clusterName : "Afghanistan",
        displayName : "Afghanistan",
        url : "https://s3.ap-south-1.amazonaws.com/moolya-app-images/countries-flag/small/Afghanistan.png",
        isActive : true,
        lat : "",
        lng : "",
        capital : "KABUL",
        about : "ABOUT",
        showOnMap: true,
        status: {
          code: 110
        },
        isEmailNotified: true
    }
    var user =
      {
      _id: '21212',
        count: ()=>{
        return 10;
        }
    }
    var context = 'uyw';
    var info = {};
    mlDbFindOneStub.returns(cluster);
    mlDbUpdateStub.returns(cluster);
    var fn = MlResolver.MlMutationResolver['upsertCluster'](obj, {cluster:cluster, clusterId: '123', moduleName:"CLUSTER", actionName:"UPDATE"}, context, info)
    sinon.assert.calledOnce(mlNotifyStub);
  });
});

describe('clusterResolver Module for fetchCluster', function(){
  beforeEach(function(){
    mldbfoStub = sinon.stub(MlAuthorization.prototype, 'validteAuthorization');
    mlErrorPayloadStub = sinon.stub(MlRespPayload.prototype, 'errorPayload');
    mlDbFindOneStub = sinon.stub(mlDBController, 'findOne');
  })
  afterEach(function(){
    mldbfoStub.restore();
    mlErrorPayloadStub.restore();
    mlDbFindOneStub.restore();
  });
  it('should return error payload if user not authorized', function(){
      mldbfoStub.returns(false);
      mlErrorPayloadStub.returns(false); // return false for now, it should return a error response object
      var obj = {};
      var args = 'xyz';
      var context = 'uyw';
      var cluster = 'siudsi';
      var info = {};
      var fn = MlResolver.MlQueryResolver['fetchCluster'](obj, {cluster:cluster, moduleName:"CLUSTER", actionName:"GET"}, context, info)
      expect(fn).to.be.equal(false); // it should be verified with an mocked error response object
  });

  it('should return undefined if authorized user but _id not present in the args', function(){
      mldbfoStub.returns(true);
      var obj = {};
      var args = 'xyz';
      var context = 'uyw';
      var cluster = 'siudsi';
      var info = {};
      var fn = MlResolver.MlQueryResolver['fetchCluster'](obj, {cluster:cluster, moduleName:"CLUSTER", actionName:"GET"}, context, info)
      expect(fn).to.be.equal(undefined); // it should be verified with an mocked error response object
  });

  it('should return user object if authorized user and _id present in the database', function(){
    mldbfoStub.returns(true);
    var obj = {};
    var args = 'xyz';
    var context = 'uyw';
    var cluster = 'siudsi';
    var info = {};
    mlDbFindOneStub.returns(true);
    var fn = MlResolver.MlQueryResolver['fetchCluster'](obj, {cluster:cluster, _id: '123', moduleName:"CLUSTER", actionName:"GET"}, context, info)
    expect(fn).to.be.equal(true); 
  });
});

describe('clusterResolver Module for updateCluster', function(){
  beforeEach(function(){
    mlDbUpdateStub = sinon.stub(mlDBController, 'update');
  })
  afterEach(function(){
    mlDbUpdateStub.restore();
  });
  it('should return undefined if the clusterId is not present in arguments', function(){
    var obj = {};
    var context = 'uyw';
    var cluster = 'siudsi';
    var info = {};
    var fn = MlResolver.MlMutationResolver['updateCluster'](obj, {cluster:cluster, moduleName:"CLUSTER", actionName:"GET"}, context, info)
    expect(fn).to.be.equal(undefined); 
  });

  it('should return updated response object if the clusterId is present in the args', function(){
      var obj = {};
      var context = 'uyw';
      var cluster = 'siudsi';
      var info = {};
      mlDbUpdateStub.returns(true);
      var fn = MlResolver.MlMutationResolver['updateCluster'](obj, {cluster:cluster, clusterId: '123', moduleName:"CLUSTER", actionName:"GET"}, context, info)
      expect(fn).to.be.equal(true); // it should be verified with an mocked error response object
  });
});

describe('clusterResolver Module for fetchClustersForMap', function(){
  beforeEach(function(){
    mlDbFindStub = sinon.stub(mlDBController, 'find');
  })
  afterEach(function(){
    mlDbFindStub.restore();
  });
  it('should return response of the find function for fetching cluster', function(){
      var obj = {};
      var res = {
        fetch(){
          return true;
        }
      }
      var args = 'xyz';
      var context = 'uyw';
      var cluster = 'siudsi';
      var info = {};
      mlDbFindStub.returns(res);
      var fn = MlResolver.MlQueryResolver['fetchClustersForMap'](obj, {cluster:cluster, moduleName:"CLUSTER", actionName:"GET"}, context, info)
      expect(fn).to.be.equal(true); // it should be verified with an mocked find object
  });
});

describe('clusterResolver Module for fetchActiveClusters', function(){
  beforeEach(function(){
    mlDbFindStub = sinon.stub(mlDBController, 'find');
  })
  afterEach(function(){
    mlDbFindStub.restore();
  });
  it('should return empty object if the clusterData is empty', function(){
      var obj = {};
      var res = {
        fetch(){
          return [];
        }
      }
      var context = 'uyw';
      var cluster = 'siudsi';
      var info = {};
      mlDbFindStub.returns(res);
      var fn = MlResolver.MlQueryResolver['fetchActiveClusters'](obj, {cluster:cluster, moduleName:"CLUSTER", actionName:"GET"}, context, info)
      expect(fn).to.deep.equal([]);
  });

  it('should return clusterData with custom object if clusterData is non empty', function(){
      var obj = {};
      var res = {
        fetch(){
          return [{}, {}];
        }
      }
      var check = [{}, {}, {"countryName" : "All", "_id" : "all"}];
      var args = 'xyz';
      var context = 'uyw';
      var cluster = 'siudsi';
      var info = {};
      mlDbFindStub.returns(res);
      var fn = MlResolver.MlQueryResolver['fetchActiveClusters'](obj, {cluster:cluster, moduleName:"CLUSTER", actionName:"GET"}, context, info)
      expect(fn).to.deep.equal(check); // it should be verified with an mocked error response object
  });
});