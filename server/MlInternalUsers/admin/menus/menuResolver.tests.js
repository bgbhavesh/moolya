import MlResolver from '../../../commons/mlResolverDef';
import MlAdminUserContext from '../../../mlAuthorization/mlAdminUserContext';
import MlUserContext from '../../../MlExternalUsers/mlUserContext';
import MenuResolver from './menuResolver.js';


describe('Menu Resolver Module', function(){

  it('should fetch menu for the current user', function () {

      let dfmenu = sinon.stub(MlAdminUserContext.prototype, 'getDefaultMenu');
      let spy = sinon.spy(MlMenus,"findOne");
      let userId = "100";
      let value = "Bakery";
      let name = "Gary";
      let argument = {name:value};
      let context = {};
      context.userId = userId;
      dfmenu.returns(value);
      let response = MlResolver.MlQueryResolver['FetchMenu'](_,{name},context);
      assert(MlMenus.findOne.calledOnce);
      assert(spy.calledWith(argument));
      spy.restore();
      dfmenu.restore();
  });

  it('should fetch menu for the current external user', function () {

      let dfPromenu = sinon.stub(MlUserContext.prototype,'getDefaultMenu');
      let spy = sinon.spy(MlMenus,"findOne");
      let userId = "100";
      let value = "Bakery";
      let name = "Gary";
      let argument = {name:value};
      let context = {};
      context.userId = userId;
      dfPromenu.returns(value);
      let response = MlResolver.MlQueryResolver['fetchExternalUserMenu'](_,{name},context);
      assert(MlMenus.findOne.calledOnce);
      console.log();
      assert(spy.calledWith(argument));
      spy.restore();
      dfPromenu.restore();
  });

  it('should fetch profile menu for the current external user', function () {

      let dfProUsermenu = sinon.stub(MlUserContext.prototype,'getDefaultProfileMenu');
      let spy = sinon.spy(MlMenus,"findOne");
      let userId = "100";
      let value = "Bakery";
      let name = "Gary";
      let argument = {name:value};
      let context = {};
      context.userId = userId;
      dfProUsermenu.returns(value);
      let response = MlResolver.MlQueryResolver['fetchExternalUserProfileMenu'](_,{name},context);
      assert(MlMenus.findOne.calledOnce);
      assert(spy.calledWith(argument));
      spy.restore();
      dfProUsermenu.restore();
  });

});
