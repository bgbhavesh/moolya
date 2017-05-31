import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['CreateIndustry'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  // let id = MlIndustries.insert({...args});
  let query ={
    "$or":[
      {
        industryName: {
          "$regex" : new RegExp('^' + args.industryName + '$', 'i')
        }
      },
      {
        industryDisplayName: {
          "$regex" :new RegExp("^" + args.industryDisplayName + '$','i')}
      }
    ]
  };
  let isFind = mlDBController.find('MlIndustries', query, context).fetch();
  if(isFind.length){
    let code = 409;
    let response = new MlRespPayload().errorPayload("Already Exists!!!!", code);
    return response;
  }
  let id = mlDBController.insert('MlIndustries', args, context)
  if (id) {
    let code = 200;
    let result = {industryId: id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
};
MlResolver.MlMutationResolver['UpdateIndustry'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (args._id) {
    var id= args._id;
    // MlProfessions.update({industryId:id},{$set:{industryName : args.industryName}},{multi:true});
    let query ={
      "_id":{
        "$ne": id
      },
      "$or":[
        {
          industryName: {
            "$regex" : new RegExp('^' + args.industryName + '$', 'i')
          }
        },
        {
          industryDisplayName: {
            "$regex" :new RegExp("^" + args.industryDisplayName + '$','i')}
        }
      ]
    };
    let isFind = mlDBController.find('MlIndustries', query, context).fetch();
    if(isFind.length) {
      let code = 409;
      let response = new MlRespPayload().errorPayload("Already Exists!!!!", code);
      return response;
    }
    mlDBController.update('MlProfessions', {industryId:id}, {industryName : args.industryName}, {$set:true, multi:true}, context)

    args=_.omit(args,'_id');
    // let result= MlIndustries.update(id, {$set: args});
    let result = mlDBController.update('MlIndustries', id, args, {$set:true}, context)
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlQueryResolver['FindIndustry'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    // MlIndustries.findOne({"_id":id});
    let response= mlDBController.findOne("MlIndustries", {"_id":id}, context);
    return response;
  }
}

MlResolver.MlQueryResolver['fetchIndustries'] = (obj, args, context, info) => {
  // let result=MlIndustries.find({isActive:true}).fetch()||[];
  let result = mlDBController.find('MlIndustries', {isActive:true}, context).fetch()||[];
  return result;
}


