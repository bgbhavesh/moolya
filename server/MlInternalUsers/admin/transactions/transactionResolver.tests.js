/**
 * Created by Shubhankit on 02/6/17.
 */

import MlResolver from '../../../commons/mlResolverDef';
import {} from './transactionResolver'
import MlRespPayload from '../../../commons/mlPayload'
import MlDBController from '../../../commons/mlDBController'
mlDBController = new MlDBController();

describe('Transaction Resolver Module', function(){

  beforeEach(function(){
    mlDbInsertStub = sinon.stub(mlDBController, 'insert');
    mlDbfindoneStub = sinon.stub(mlDBController, 'findOne');
    mlPayloadStub = sinon.stub(MlRespPayload.prototype, 'successPayload');
  })
  afterEach(function(){
    mlDbInsertStub.restore();
    mlDbfindoneStub.restore();
    mlPayloadStub.restore();
  });

  it('should return success response for successfull transaction', function(){
    let context = {
      userId: '123',
      ip:{},
      browser: {}

    }
    context.userId = '123';
    mlDbInsertStub.returns('123');
    mlDbfindoneStub.returns('abc');
    mlPayloadStub.returns(true);
    let obj = {};
    var fn = MlResolver.MlMutationResolver['createTransactionLog'](obj, {}, context, {});

    //Using true for now, but it should be the actual success payload in the new format.
    expect(fn).to.be.equal(true);
  });
});
