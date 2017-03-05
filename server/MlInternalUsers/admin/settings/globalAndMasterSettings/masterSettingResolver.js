import MlResolver from '../../mlAdminResolverDef'


MlResolver.MlQueryResolver['fetchMasterSettings'] = (obj, args, context, info) => {
  // TODO : Authorization
         console.log(args);
     return MlMasterData.find({type:args.type}).fetch();
}


MlResolver.MlMutationResolver['createMasterSetting'] = (obj, args, context, info) => {
  // TODO : Authorization
  console.log(args);
  let settingsObj=null;
  switch(args.type){
    case "LANGUAGE":
      settingsObj={"type":"LANGUAGE","languageInfo":args.settingsData.languageInfo};
      break;
  }
  settingsObj["hierarchyLevel"]=1;
  settingsObj["hierarchyCode"]="aaa";
  settingsObj["hierarchyRefId"]="sss";
  settingsObj["hierarchyRefName"]="sss";

  MlMasterData.insert(settingsObj);

}


