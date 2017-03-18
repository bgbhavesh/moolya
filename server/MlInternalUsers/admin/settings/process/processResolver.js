
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';
/*
MlResolver.MlQueryResolver['fetchProcess'] = (obj, args, context, info) =>{
  return MlProcessMapping.findOne({name});
}*/

MlResolver.MlMutationResolver['createProcess'] = (obj, args, context, info) =>{
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  let process = args.process;
    if(MlProcessMapping.find({processId:process.processId}).count() > 0){
        let code = 409;
        let response = new MlRespPayload().errorPayload("Already Exist", code);
        return response
    }
    let id = MlProcessMapping.insert({...args.process});
    if(id){
        let code = 200;
        let result = {roleId: id}
        let response = new MlRespPayload().successPayload(result, code);
        return response
    }
}
MlResolver.MlQueryResolver['findProcess'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.id) {
    var id= args.id;
    let response= MlProcessMapping.findOne({"_id":id});
    console.log(response)
    let documents=response&&response.documents?response.documents:[];
    documents.map(function (doc, index) {
     let kycCategeotyId=doc.category
     const kycCategory= MlDocumentCategories.findOne({_id:kycCategeotyId})||'';
      doc.categoryName=kycCategory.docCategoryName;
    });
    return response;
  }

}

MlResolver.MlMutationResolver['updateProcess'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (args.id) {
    var id= args.id;
    args=_.omit(args,'_id');
    let result= MlProcessMapping.update(id, {$set: args.process});
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
