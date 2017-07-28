/**
 * Created by venkatsrinag on 21/4/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['createSubDomain'] = (obj, args, context, info) => {
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
  args.SubDomainMasterData.createdBy = createdBy;
  args.SubDomainMasterData.createdDate = new Date();

  if(args && args.SubDomainMasterData){
    try{
      let ret = MlSubDomain.insert({...args.SubDomainMasterData})
      if(ret){
        let response = new MlRespPayload().successPayload("Sub Domain Created Successfully", 200);
        return response;
      }
      else{
        let response = new MlRespPayload().errorPayload("Error in Creating Sub Domain", 400);
        return response;
      }
    }
    catch (e){
      let response = new  MlRespPayload().errorPayload(e.message, 401);
      return response;
    }

  }
}

MlResolver.MlMutationResolver['updateSelectedSubDomain'] = (obj, args, context, info) => {
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
  args.SubDomainMasterData.updatedBy = createdBy;
  args.SubDomainMasterData.updatedDate = new Date();

  if(args && args.SubDomainId && args.SubDomainMasterData){
    // try{
      let resp = MlSubDomain.update({_id: args.SubDomainId}, {$set: args.SubDomainMasterData}, {upsert: true})
      if(resp){
        let response = new MlRespPayload().successPayload("Sub Domain Created Successfully", 200);
        return response;
      }
      else{
        let response = new MlRespPayload().errorPayload("Error in Creating Sub Domain", 400);
        return response;
      }
    // }
    // catch (e){
    //   let response = new MlRespPayload().errorPayload(e.message, 400);
    //   return response;
    // }
  }
}

MlResolver.MlQueryResolver['findSubDomain'] = (obj, args, context, info) => {
  if(args && args.SubDomainId){
    return MlSubDomain.findOne({"_id":args.SubDomainId})
  }
}


MlResolver.MlQueryResolver['fetchIndustryDomain'] = (obj, args, context, info) => {
  return MlSubDomain.find({industryId:args.industryId, isActive : true}).fetch();
}
