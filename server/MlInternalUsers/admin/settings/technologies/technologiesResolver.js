/**
 * Created by venkatsrinag on 21/4/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['createTechnology'] = (obj, args, context, info) => {
  var firstName='';var lastName='';
  // let id = MlDepartments.insert({...args.department});
  if(Meteor.users.findOne({_id : context.userId}))
  {
    let user = Meteor.users.findOne({_id: context.userId}) || {}
    if(user&&user.profile&&user.profile.isInternaluser&&user.profile.InternalUprofile) {

      firstName=(user.profile.InternalUprofile.moolyaProfile || {}).firstName||'';
      lastName=(user.profile.InternalUprofile.moolyaProfile || {}).lastName||'';
    }else if(user&&user.profile&&user.profile.isExternaluser) { //resolve external user context based on default profile
      firstName=(user.profile || {}).firstName||'';
      lastName =(user.profile || {}).lastName||'';
    }
  }
  let createdBy = firstName +' '+lastName
  args.technologyMasterData.createdBy = createdBy;
  args.technologyMasterData.createdDate = new Date();
  if(args && args.technologyMasterData){
    try{
      let ret = MlTechnologies.insert({...args.technologyMasterData})
      if(ret){
        let response = new MlRespPayload().successPayload("Technology Created Successfully", 200);
        return response;
      }
      else{
        let response = new MlRespPayload().errorPayload("Error in Creating an Asset", 400);
        return response;
      }
    }
    catch (e){
      let response = new  MlRespPayload().errorPayload(e.message, 400);
      return response;
    }

  }
}

MlResolver.MlMutationResolver['updateSelectedTechnology'] = (obj, args, context, info) => {
  var firstName='';var lastName='';
  // let id = MlDepartments.insert({...args.department});
  if(Meteor.users.findOne({_id : context.userId}))
  {
    let user = Meteor.users.findOne({_id: context.userId}) || {}
    if(user&&user.profile&&user.profile.isInternaluser&&user.profile.InternalUprofile) {

      firstName=(user.profile.InternalUprofile.moolyaProfile || {}).firstName||'';
      lastName=(user.profile.InternalUprofile.moolyaProfile || {}).lastName||'';
    }else if(user&&user.profile&&user.profile.isExternaluser) { //resolve external user context based on default profile
      firstName=(user.profile || {}).firstName||'';
      lastName =(user.profile || {}).lastName||'';
    }
  }
  let createdBy = firstName +' '+lastName
  args.technologyMasterData.updatedBy = createdBy;
  args.technologyMasterData.updatedDate = new Date();

  if(args && args.technologyId && args.technologyMasterData){
    try{
      let resp = MlTechnologies.update({_id: args.technologyId}, {$set: args.technologyMasterData}, {upsert: true})
      if(resp){
        let response = new MlRespPayload().successPayload("Asset Created Successfully", 200);
        return response;
      }
      else{
        let response = new MlRespPayload().errorPayload("Error in Creating an Asset", 400);
        return response;
      }
    }
    catch (e){
      let response = new MlRespPayload().errorPayload(e.message, 400);
      return response;
    }
  }
}

MlResolver.MlQueryResolver['findTechnology'] = (obj, args, context, info) => {
  if(args && args.technologyId){
    return MlTechnologies.findOne({"_id":args.technologyId})
  }
}


MlResolver.MlQueryResolver['fetchTechnologies'] = (obj, args, context, info) => {
  return MlTechnologies.find({isActive : true}).fetch();
}
