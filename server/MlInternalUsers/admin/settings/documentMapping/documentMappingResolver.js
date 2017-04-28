import MlResolver from '../../../../commons/mlResolverDef'
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
  if (args.kycId&&args.processId) {

    var kycId = args.kycId;
    var processId= args.processId
    let response= MlProcessMapping.findOne({"_id":processId});
    if(response){
      let documents=response.documents;
      let clusterId=response.clusters;
      let chapterId=response.chapters;
      let subChapterId=response.subChapters;
      let docIds=[],data=[];
      for(let i=0;i<documents.length;i++){
        if(documents[i].category==kycId&&documents[i].isActive==true){
          docIds.push(documents[i].type)
        }
      }
      var uniquedocId = docIds.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
      })
      if(uniquedocId.length>=1){
        for(let i=0;i<uniquedocId.length;i++){
          let Documentdata = MlDocumentMapping.find({"$and":[{ kycCategory : { $in: [kycId] },documentType: {$in :[uniquedocId[i]]}, clusters: {$in: clusterId},
            chapters: {$in: chapterId},
            subChapters:{$in: subChapterId},isActive:true}]}).fetch();

          if(Documentdata.length>=1){
            Documentdata.map(function (doc,index) {
              doc.documentType=[];
              Documentdata[index].documentType[0]=uniquedocId[i]
            });
            for(let j=0;j<Documentdata.length;j++){
              data.push(Documentdata[j])
            }
          }else{
            let DocumentdataDetails = MlDocumentMapping.find({"$and":[{ kycCategory : { $in: [kycId] },documentType: {$in :[uniquedocId[i]]}, clusters: {$in: ["all"]},
              chapters: {$in: ["all"]},
              subChapters:{$in: ["all"]},isActive:true}]}).fetch();
            DocumentdataDetails.map(function (doc,index) {
              doc.documentType=[];
              DocumentdataDetails[index].documentType[0]=uniquedocId[i]
            });
            for(let j=0;j<DocumentdataDetails.length;j++){
              data.push(DocumentdataDetails[j])
            }
          }

        }
      }

      data.map(function (doc,index) {
        const allowableFormatData = MlDocumentFormats.find( { _id: { $in: doc.allowableFormat } } ).fetch() || [];
        let allowableFormatNames = [];  //@array of strings
        allowableFormatData.map(function (doc) {
          allowableFormatNames.push(doc.docFormatName)
        });
        data[index].allowableFormat = allowableFormatNames || [];
      });
      return data;
    }


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

