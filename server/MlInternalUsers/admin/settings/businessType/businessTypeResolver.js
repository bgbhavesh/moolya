import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['CreateBusinessType'] = (obj, args, context, info) => {
  // TODO : Authorization
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if(!args.businessTypeName){
    let code = 401;
    let response = new MlRespPayload().errorPayload("Business Name is Required", code);
    return response;
  }else {
    let query ={
      "$or":[
        {
          businessTypeName: {
            "$regex" : new RegExp('^' + args.businessTypeName + '$', 'i')
          }
        },
        {
          businessTypeDisplayName: {
            "$regex" :new RegExp("^" + args.businessTypeDisplayName + '$','i')}
        }
      ]
    };
    let isFind = MlBusinessType.find(query).fetch();
    if(isFind.length){
      let code = 409;
      let response = new MlRespPayload().errorPayload("Already Exists!!!!", code);
      return response;
    }
    let id = MlBusinessType.insert({...args});
    if (id) {
      let code = 200;
      let result = {businessTypeId: id}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
}

MlResolver.MlMutationResolver['UpdateBusinessType'] = (obj, args, context, info) => {
  // TODO : Authorization
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if(!args.businessTypeName){
    let code = 401;
    let response = new MlRespPayload().errorPayload("Business Name is Required", code);
    return response;
  }else {
    if (args._id) {
      var id = args._id;
      let query ={
        "_id":{
          "$ne": id
        },
        "$or":[
          {
            businessTypeName: {
              "$regex" : new RegExp('^' + args.businessTypeName + '$', 'i')
            }
          },
          {
            businessTypeDisplayName: {
              "$regex" :new RegExp("^" + args.businessTypeDisplayName + '$','i')}
          }
        ]
      };
      let isFind = MlBusinessType.find(query).fetch();
      if(isFind.length) {
        let code = 409;
        let response = new MlRespPayload().errorPayload("Already Exists!!!!", code);
        return response;
      }
      args = _.omit(args, '_id');
      let result = MlBusinessType.update(id, {$set: args});
      let code = 200;
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
}

MlResolver.MlQueryResolver['FindBusinessType'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id = args._id;
    let response = MlBusinessType.findOne({"_id": id});
    return response;
  }
}

MlResolver.MlQueryResolver['fetchBusinessTypes'] = (obj, args, context, info) => {
  let result=MlBusinessType.find({isActive:true}).fetch()||[];
  return result;
}

