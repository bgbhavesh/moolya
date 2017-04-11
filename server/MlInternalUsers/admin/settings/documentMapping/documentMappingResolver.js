import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['createDocument'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  let id = MlDocumentMapping.insert({...args.document});
  if (id) {
    let code = 200;
    let result = {documentId: id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlMutationResolver['updateDocument'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (args.documentId) {
    args=_.omit(args,'_id');
    let result= MlDocumentMapping.update({documentId:args.documentId}, {$set: args.document});
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }

}
MlResolver.MlQueryResolver['findDocument'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.documentId) {
    var id= args.documentId;
    let response= MlDocumentMapping.findOne({"documentId":id});
    return response;
  }

}
MlResolver.MlQueryResolver['findDocuments'] = (obj, args, context, info) => {
  // TODO : Authorization
  let response=  MlDocumentMapping.find({}).fetch();
  return response;

}
MlResolver.MlQueryResolver['findProcessDocuments'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.kycId&&args.docTypeId) {
    var id = args.kycId;
    var docId= args.docTypeId
    let data = MlDocumentMapping.find({ kycCategory : { $in: [id] },documentType: {$in :[docId]},isActive:true}).fetch();
    data.map(function (doc,index) {
      const allowableFormatData =  MlDocumentFormats.find( { _id: { $in: doc.allowableFormat } } ).fetch() || [];
      let allowableFormatNames = [];  //@array of strings
      allowableFormatData.map(function (doc) {
        allowableFormatNames.push(doc.docFormatName)
      });
      data[index].allowableFormat = allowableFormatNames || [];
    });
    return data;
  }
}


MlResolver.MlQueryResolver['fetchKycDocProcessMapping'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.documentTypeId&&args.clusterId&&args.chapterId&&args.subChapterId) {
    let id = args.documentTypeId;
    let clusterId=args.clusterId;
    let chapterId=args.chapterId;
    let subChapterId=args.subChapterId;
    let data=[];
    if(clusterId.length==1&&clusterId[0]=="all"&&chapterId[0]=="all"&&subChapterId[0]=="all"){
       data = MlDocumentMapping.find({ documentType : { $in: [id] },isActive:true}).fetch();
    }else {
       data = MlDocumentMapping.find({
        documentType: {$in: [id]},
        clusters: {$in: clusterId},
         chapters: {$in: chapterId},
         subChapters:{$in: subChapterId},
        isActive: true
      }).fetch();
       if(data.length<1){
         data = MlDocumentMapping.find({
           documentType: {$in: [id]},
           clusters: {$in: ["all"]},
           chapters: {$in: ["all"]},
           subChapters:{$in: ["all"]},
           isActive: true
         }).fetch();
       }
    }
    let kycId=[]
    data.map(function (doc,index) {

      let kycCategory=doc.kycCategory
      kycCategory.map(function(kyc){
        kycId.push(kyc)
      });
     /* const kycCategoryData = MlDocumentCategories.find( { _id: { $in: doc.kycCategory } } ).fetch() || [];
      let allowableFormatNames = [];  //@array of strings
      allowableFormatData.map(function (doc) {
        allowableFormatNames.push(doc.docFormatName)
      });
      data[index].allowableFormat = allowableFormatNames || [];*/
    });
    if(kycId.length>=1){
    console.log(kycId)
      let uniqueKyc = _.uniq(kycId, function(item, key, a) {
        return item.a;
      });
    console.log(uniqueKyc)
      data = MlDocumentCategories.find( { _id: { $in: uniqueKyc } } ).fetch() || [];
    }
    return data;
  }
}

