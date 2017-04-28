import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";
import _ from "lodash";
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
    // if(MlProcessMapping.find({processId:process.processId}).count() > 0){
      if(mlDBController.find('MlProcessMapping', {processId:process.processId}, context).count() > 0){
        let code = 409;
        let response = new MlRespPayload().errorPayload("Already Exist", code);
        return response
    }
    // let id = MlProcessMapping.insert({...args.process});
    let id = mlDBController.insert('MlProcessMapping', args.process, context)
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
    // let response= MlProcessMapping.findOne({"_id":id});
    let response = mlDBController.findOne('MlProcessMapping', {_id: id}, context)
    let documents=response&&response.documents?response.documents:[];
    documents.map(function (doc, index) {
     let kycCategeotyId=doc.category
     // const kycCategory= MlDocumentCategories.findOne({_id:kycCategeotyId})||'';
      const kycCategory = mlDBController.findOne('MlDocumentCategories', {_id: kycCategeotyId}, context)||'';
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
    args=_.omit(args,'id');
    // let result= MlProcessMapping.update(id, {$set: args.process});
    let result = mlDBController.update('MlProcessMapping', id, args.process, {$set:true}, context)
      let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['upsertProcessDocument'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (args.id) {
    var id = args.id;
    args = _.omit(args, '_id');
    if (args.kycCategoryId) {
      // let result = MlProcessMapping.update({_id:id,'processDocuments' : {
      //     $elemMatch: {
      //       'kycCategoryId': args.kycCategoryId,'docTypeId': args.docTypeId, 'documentId':args.documentId}
      //   }
      // }, {$set: {"processDocuments.$.isMandatory": args.isMandatory,"processDocuments.$.isActive": args.isActive}});

      let result = mlDBController.update('MlProcessMapping', {
        _id: id, 'processDocuments': {
          $elemMatch: {
            'kycCategoryId': args.kycCategoryId, 'docTypeId': args.docTypeId, 'documentId': args.documentId
          }
        }
      }, {
        "processDocuments.$.isMandatory": args.isMandatory,
        "processDocuments.$.isActive": args.isActive
      }, {$set: true}, context)

      if(result!=1){
          console.log("insertion opertion");
          let processDocument={};
          // let documentMappingDef=MlDocumentMapping.findOne(args.documentId);
          let documentMappingDef = mlDBController.findOne('MlDocumentMapping', args.documentId, context)
          // let doctypeDetails=MlDocumentTypes.findOne({_id:args.docTypeId})
          let doctypeDetails = mlDBController.findOne('MlDocumentTypes', {_id: args.docTypeId}, context)
          // let kycCategories=MlDocumentCategories.findOne({_id:args.kycCategoryId})
          let kycCategories = mlDBController.findOne('MlDocumentCategories', {_id:args.kycCategoryId}, context)
           processDocument=_.pick(documentMappingDef, ['documentDisplayName','allowableFormat','documentName','inputLength','allowableMaxSize'])
           processDocument.kycCategoryId=args.kycCategoryId;
           processDocument.kycCategoryName=kycCategories.docCategoryName
           processDocument.docTypeId=args.docTypeId;
           processDocument.docTypeName=doctypeDetails.docTypeName
           processDocument.documentId=documentMappingDef._id;
           processDocument.isMandatory=args.isMandatory;
           processDocument.isActive=args.isActive;
        mlDBController.update('MlProcessMapping', id, {'processDocuments':processDocument}, {$push:true}, context)
        // MlProcessMapping.update({_id:id},{'$push':{'processDocuments':processDocument}});
      }
      let code = 200;
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
}

MlResolver.MlQueryResolver['findProcessDocumentForRegistration'] = (obj, args, context, info) => {
  // TODO : Authorization

  /*if (args.clusterId) {
    let document= MlProcessMapping.findOne({"clusters":args.clusterId,"chapters": args.chapterId,"subChapters": args.subChapterId,"communities":args.communityType,"userTypes":args.userType,"identity":args.identityType,"professions":args.profession,"industries":args.industry
    });
    if(document!=undefined){
      data=document.processDocuments;
      data.map(function (doc,index) {
        const allowableFormatData =  MlDocumentFormats.find( { _id: { $in: doc.allowableFormat } } ).fetch() || [];
        let allowableFormatNames = [];  //@array of strings
        allowableFormatData.map(function (doc) {
          allowableFormatNames.push(doc.docFormatName)
        });
        data[index].allowableFormat = allowableFormatNames || [];
      });
      return document
    }else{
      let document= MlProcessMapping.findOne({"clusters":args.clusterId,"chapters": args.chapterId,"subChapters": args.subChapterId,"communities":args.communityType,"userTypes":args.userType,"identity":args.identityType,"professions":args.profession,"industries":args.industry
      });
    }
    }*/
  let clusters=args.clusterId;
  let chapters=args.chapterId;
  let subChapters=args.subChapterId;
  let communities=args.communityType;
  let professions=args.profession;
  let process=null
  let specificQuery=[];
  //check for specific condition for all criteria fields of processmapping
  if(clusters!=null&&chapters!=null&&subChapters!=null&&communities!=null&&professions!=null){
    let val={clusters,chapters,subChapters,communities,professions}
   process=fetchProcessProxy(val);
    if(process){
      return process
    }
  }
  //check for all or specific condition for all criteria fields of processmapping
  let val={clusters,chapters,subChapters,communities,professions}
  for (var key in val) {
    let qu={};
    qu[key]={$in:['all',val[key]]};
    specificQuery.push(qu);//console.log(qu);
  }
  let query={$and:specificQuery}
  process=fetchProcessProxy(query);
  if(process){
    return process
  }
  //check for 'all' condition on criteria fields of processmapping
  let allVal={clusters:"all",chapters:"all",subChapters:"all",communities:"all",professions:"all"}
  process=fetchProcessProxy(allVal);
  if(process){
    return process
  }

  function fetchProcessProxy(query){
    console.log(query)
    let document= MlProcessMapping.findOne({ $and: [query,{"userTypes":{ $in: [args.userType]},"identity":{ $in: [args.identityType]},"industries":{ $in: [args.industry]},"isActive":true}]})
    if(document!=undefined){
      data=document.processDocuments;
      data.map(function (doc,index) {
        const allowableFormatData =  MlDocumentFormats.find( { _id: { $in: doc.allowableFormat } } ).fetch() || [];
        let allowableFormatNames = [];  //@array of strings
        allowableFormatData.map(function (doc) {
          allowableFormatNames.push(doc.docFormatName)
        });
        data[index].allowableFormat = allowableFormatNames || [];
      });
      return document
    }
  }

    return process;
}

