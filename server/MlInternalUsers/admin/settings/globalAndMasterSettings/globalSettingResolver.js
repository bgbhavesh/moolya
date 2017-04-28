/**
 * Created by mohammed.mohasin on 04/03/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlGlobalSettingRepo from './repository/mlGlobalSettingRepo';

MlResolver.MlQueryResolver['fetchGlobalSettings'] = (obj, args, context, info) => {
  // TODO : Authorization

     // return MlGlobalSettings.find({}).fetch();
     return mlDBController.find('MlGlobalSettings', {}, context).fetch();
}


MlResolver.MlMutationResolver['updateGlobalSetting'] = (obj, args, context, info) => {
  // TODO : Authorization
     let globalSettingRecord=new MlGlobalSettingRepo(context.userId).updateGlobalSetting(args, context);
     return globalSettingRecord;
}


