import MlResolver from '../../mlAdminResolverDef'
import MlGlobalSettingRepo from './repository/mlGlobalSettingRepo';

MlResolver.MlQueryResolver['fetchGlobalSettings'] = (obj, args, context, info) => {
  // TODO : Authorization

     return MlGlobalSettings.find({}).fetch();
}


MlResolver.MlMutationResolver['updateGlobalSetting'] = (obj, args, context, info) => {
  // TODO : Authorization
     let globalSettingRecord=new MlGlobalSettingRepo(context.userId).updateGlobalSetting(args);
     return globalSettingRecord;
}


