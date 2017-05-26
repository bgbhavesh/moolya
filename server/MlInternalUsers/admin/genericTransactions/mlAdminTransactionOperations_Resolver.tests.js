import MlResolver from '../../../commons/mlResolverDef';
import '../transactions/transactionResolver.js';
import MlAdminTOResolver from './mlAdminTransactionOperations_Resolver';
import mlTransactionsEngine from './core/mlTransactionsEngine';

describe('Admin Transaction Operations Resolver Module', function () {

  beforeEach(function () {

      // freezeStub = sinon.stub(Object,'freeze');
      // //mlt = new mlTransactionsEngine();
      // tranStub = sinon.stub(mlTransactionsEngine,'fetchTransactions');
      // mlr = new MlResolver.MlMutationResolver();
        assignstub = sinon.stub(MlResolver.MlMutationResolver, 'assignTransaction');
  });
  afterEach(function () {
        assignstub.restore();
      // freezeStub.restore();
      // tranStub.restore();
  });
  it('should call assigntransaction for operation assignTransaction for registration type', function () {
    // let obj = {};
    // let args = {};
    // let context = {};
    // let type = "Registration";
    // let op = "assignTransaction";
    // let info = {};
    // let ob = {success : false};
    // args.operation = op;
    // args.transactionType = type;
    // args.transactionId = "1000";
    // args.params = {};
    // args.params.assignedUserId = '2abd';
    // args.params.status = 'active';
    // let response;
    // assignstub.returns(ob);
    // response = MlResolver.MlMutationResolver['updateGenericTransaction'](obj, args, context, info);
    // expect(response).to.be.equal({success: false});
  });

  it('should return an object of empty object for non registration type transactions', function () {
    // let obj = {};
    // let args = {};
    // let context = {};
    // let type = "Registration";
    // let op = "assignTransaction";
    // args.operation = op;
    // args.transactionType = type;
    // args.transactionId = "1000";
    // args.params.assignedUserId = '2abd';
    // args.params.status = 'active';
    // let response;
    // response = MlResolver.MlMutationResolver['updateGenericTransaction'](obj, args, context, info);
  });
  it('should call unassign transaction', function () {

  });
  it('should self assign transaction', function () {

  });
  it('should update transaction status', function () {

  });
  it('should assign transaction', function () {

  });
  it('should provide work flow of transaction', function () {

  });

});
