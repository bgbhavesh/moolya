import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';
import _underscore from 'underscore'

MlResolver.MlMutationResolver.createDocument = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }
  const query = {
    $or: [
      {
        documentName: {
          $regex: new RegExp(`^${args.document.documentName}$`, 'i')
        }
      },
      {
        documentDisplayName: { $regex: new RegExp(`^${args.document.documentDisplayName}$`, 'i') }
      }
    ]
  };
  const isFind = MlDocumentMapping.find(query).fetch();
  if (isFind.length) {
    const code = 409;
    const response = new MlRespPayload().errorPayload("'DocumentMapping' already exists!", code);
    return response;
  }
  let firstName = ''; let lastName = '';
  // let id = MlDepartments.insert({...args.department});
  if (Meteor.users.findOne({ _id: context.userId })) {
    const user = Meteor.users.findOne({ _id: context.userId }) || {}
    if (user && user.profile && user.profile.isInternaluser && user.profile.InternalUprofile) {
      firstName = (user.profile.InternalUprofile.moolyaProfile || {}).firstName || '';
      lastName = (user.profile.InternalUprofile.moolyaProfile || {}).lastName || '';
    } else if (user && user.profile && user.profile.isExternaluser) { // resolve external user context based on default profile
      firstName = (user.profile || {}).firstName || '';
      lastName = (user.profile || {}).lastName || '';
    }
  }
  const createdBy = `${firstName} ${lastName}`
  args.document.createdBy = createdBy;
  args.document.createdDate = new Date();
  const randomId = Math.floor(Math.random() * 90000) + 10000;
  args.document.documentId = `DOC${randomId}`
  args.document.validity = args.document && args.document.validity ? new Date(args.document.validity) : null
  const id = MlDocumentMapping.insert({ ...args.document });
  if (id) {
    const code = 200;
    const result = { documentId: id }
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlMutationResolver.updateDocument = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (args.documentId) {
    const id = args.documentId;
    const query = {
      documentId: {
        $ne: id
      },
      $or: [
        {
          documentName: {
            $regex: new RegExp(`^${args.document.documentName}$`, 'i')
          }
        },
        {
          documentDisplayName: { $regex: new RegExp(`^${args.document.documentDisplayName}$`, 'i') }
        }
      ]
    };
    const isFind = MlDocumentMapping.find(query).fetch();
    if (isFind.length) {
      const code = 409;
      const response = new MlRespPayload().errorPayload("'DocumentMapping' already exists!", code);
      return response;
    }
    args = _.omit(args, '_id');
    let firstName = ''; let lastName = '';
    // let id = MlDepartments.insert({...args.department});
    if (Meteor.users.findOne({ _id: context.userId })) {
      const user = Meteor.users.findOne({ _id: context.userId }) || {}
      if (user && user.profile && user.profile.isInternaluser && user.profile.InternalUprofile) {
        firstName = (user.profile.InternalUprofile.moolyaProfile || {}).firstName || '';
        lastName = (user.profile.InternalUprofile.moolyaProfile || {}).lastName || '';
      } else if (user && user.profile && user.profile.isExternaluser) { // resolve external user context based on default profile
        firstName = (user.profile || {}).firstName || '';
        lastName = (user.profile || {}).lastName || '';
      }
    }
    const createdBy = `${firstName} ${lastName}`
    args.document.updatedBy = createdBy;
    args.document.updatedDate = new Date();
    args.document.validity = args.document && args.document.validity ? new Date(args.document.validity) : null
    const existingDoc = MlDocumentMapping.findOne({ documentId: args.documentId });

    const result = MlDocumentMapping.update({ documentId: args.documentId }, { $set: args.document });
    let error = false;
    let manditioryStatusError = false;
    if (result) {
      /**
      * @ if allowableformat is changed when updating Document Mapping
      * @ Allowbale format in process documents need to be updated with reference to document id
      * @ DocumentId-Primary key
       * @ Model-ProcessMapping
      */
      const allowableFormatNewArray = args.document && args.document.allowableFormat ? args.document.allowableFormat : []
      const allowableFormatExistingArray = existingDoc && existingDoc.allowableFormat ? existingDoc.allowableFormat : []
      const isAllowableFormat_same = allowableFormatExistingArray.length == allowableFormatNewArray.length && allowableFormatExistingArray.every((element, index) => element === allowableFormatNewArray[index]);

      /**
       * @ if current document mapping allowable size is changed
       * @ Allowable size of process documents need to be changed wrt documentid
       * @ DocumentId-Primary key
       * @ Model-ProcessMapping
       */

      const documentSizeNewArray = args.document && args.document.allowableMaxSize || ''
      const documentSizeExistingArray = existingDoc.allowableMaxSize || ''

      /**
       * @ if current document mapping status is changed
       * @ Status of process document need to be changed wrt documentid
       * @ DocumentId-Primary key
       * @ Model-ProcessMapping
       */

      const documentStatusNewArray = args.document && args.document.isActive
      const documentStatusExistingArray = existingDoc.isActive

      /**
       * @ if kyc Category is removed when updating Document Mapping
       * @ Particular kyc category need to be dropped from process documents with reference to document id
       * @ DocumentId-Primary key
       * @ Model-ProcessMapping
       */
      const kycCategoryNewArray = args.document && args.document.kycCategory ? args.document.kycCategory : []
      const kycCategoryExistingArray = existingDoc && existingDoc.kycCategory ? existingDoc.kycCategory : []
      const isKYC_same = kycCategoryExistingArray.length == kycCategoryNewArray.length && kycCategoryExistingArray.every((element, index) => element === kycCategoryNewArray[index]);


      let updatedAllowableFormat; let updatedKYC; let updatedDocTypes; let updateStatus


      if (!isAllowableFormat_same || (documentSizeNewArray != documentSizeExistingArray) || (documentStatusNewArray != documentStatusExistingArray) || !isKYC_same) {
        const resultData = MlProcessMapping.find({
          processDocuments: {
            $elemMatch: {
              documentId: existingDoc._id && existingDoc._id
            }
          }
        }).fetch()


        if (resultData && resultData.length > 0) {
          for (let i = 0; i < resultData.length; i++) {
            const kycDocs = resultData && resultData[i].processDocuments && resultData[i].processDocuments.length > 0 ? resultData[i].processDocuments : []
            if (kycDocs && kycDocs.length > 0) {
              _.each(kycDocs, (event, index) => {
                if (event.documentId == existingDoc._id) {
                  if (!isAllowableFormat_same) {
                    event.allowableFormat = allowableFormatNewArray;
                  }
                  if (documentSizeNewArray != documentSizeExistingArray) {
                    event.allowableMaxSize = args.document && args.document.allowableMaxSize ? args.document.allowableMaxSize : '';
                  }
                  if (documentStatusNewArray != documentStatusExistingArray && event.isMandatory) {
                    const updateFail = MlDocumentMapping.update({ documentId: args.documentId }, { $set: existingDoc })
                    if (updateFail) {
                      error = true
                    }
                  }
                  if (documentStatusNewArray != documentStatusExistingArray && !event.isMandatory) {
                    event.isActive = args.document && args.document.isActive ? args.document.isActive : true;
                    error = false
                  }
                  if (!isKYC_same && event.isMandatory) {
                    const updateFail = MlDocumentMapping.update({ documentId: args.documentId }, { $set: existingDoc })
                    if (updateFail) {
                      manditioryStatusError = true
                    }
                  }
                }
              });
            }
            updatedAllowableFormat = mlDBController.update('MlProcessMapping', {
              _id: resultData && resultData[i] && resultData[i]._id
            }, {
              processDocuments: kycDocs
            }, { $set: true, multi: true }, context)
          }
        }
      }


      if (!manditioryStatusError) {
        let updatedKYCDocs;

        /* if(kycCategoryNewArray&&kycCategoryExistingArray&&kycCategoryNewArray.length>kycCategoryExistingArray.length){
          updatedKYCDocs = _underscore.difference(kycCategoryNewArray,kycCategoryExistingArray)
        }else */
        if (kycCategoryNewArray && kycCategoryExistingArray && kycCategoryNewArray.length < kycCategoryExistingArray.length) {
          updatedKYCDocs = _underscore.difference(kycCategoryExistingArray, kycCategoryNewArray)
        } else {
          updatedKYCDocs = _underscore.difference(kycCategoryExistingArray, kycCategoryNewArray)
        }
        if (updatedKYCDocs && updatedKYCDocs.length > 0) {
          updatedKYC = mlDBController.update('MlProcessMapping', {
            processDocuments: {
              $exists: true,
              $elemMatch: {
                documentId: existingDoc._id && existingDoc._id
              }
            }
          }, {
            processDocuments: { kycCategoryId: { $in: updatedKYCDocs } }
          }, { $pull: true, multi: true }, context)
        }
      }

      /**
       * @ if document type is removed when updating Document Mapping
       * @ Particular document type need to be dropped from process documents with reference to document id
       * @ DocumentId-Primary key
       * @ Model-ProcessMapping
       */
      const documentTypeNewArray = args.document && args.document.documentType ? args.document.documentType : []
      const documentTypeExistingArray = existingDoc && existingDoc.documentType ? existingDoc.documentType : []
      const isDocType_same = documentTypeExistingArray.length == documentTypeNewArray.length && documentTypeExistingArray.every((element, index) => element === documentTypeNewArray[index]);

      if (!isDocType_same) {
        let updatedDocTypes = [];
        if (documentTypeNewArray && documentTypeExistingArray && documentTypeNewArray.length < documentTypeExistingArray.length) {
          updatedDocTypes = _underscore.difference(documentTypeExistingArray, documentTypeNewArray)
        } else if (documentTypeNewArray && documentTypeExistingArray && documentTypeNewArray.length == documentTypeExistingArray.length) {
          updatedDocTypes = _underscore.difference(documentTypeExistingArray, documentTypeNewArray)
        }
        if (updatedDocTypes && updatedDocTypes.length > 0) {
          updatedDocTypes = mlDBController.update('MlProcessMapping', {
            processDocuments: {
              $exists: true,
              $elemMatch: {
                documentId: existingDoc._id && existingDoc._id
              }
            }
          }, {
            processDocuments: { docTypeId: { $in: updatedDocTypes } }
          }, { $pull: true, multi: true }, context)
        }
      }

      /**
       * @ if jusrisdication cluster is changed when updating Document Mapping
       * @ Particular document  need to be dropped from process documents with reference to document id
       * @ DocumentId-Primary key
       * @ Model-ProcessMapping
       */
      const clustersNewArray = args.document && args.document.clusters ? args.document.clusters : []
      const clustersExistingArray = existingDoc && existingDoc.clusters ? existingDoc.clusters : []
      const iscluster_same = clustersExistingArray.length == clustersNewArray.length && clustersExistingArray.every((element, index) => element === clustersNewArray[index]);

      /**
       * @ if jusrisdication chapter is changed when updating Document Mapping
       * @ Particular document  need to be dropped from process documents with reference to document id
       * @ DocumentId-Primary key
       * @ Model-ProcessMapping
       */
      const chaptersNewArray = args.document && args.document.chapters ? args.document.chapters : []
      const chaptersExistingArray = existingDoc && existingDoc.chapters ? existingDoc.chapters : []
      const ischapter_same = chaptersExistingArray.length == chaptersNewArray.length && chaptersExistingArray.every((element, index) => element === chaptersNewArray[index]);

      /**
       * @ if jusrisdication sub chapter is changed when updating Document Mapping
       * @ Particular document  need to be dropped from process documents with reference to document id
       * @ DocumentId-Primary key
       * @ Model-ProcessMapping
       */
      const subChaptersNewArray = args.document && args.document.subChapters ? args.document.subChapters : []
      const subChaptersExistingArray = existingDoc && existingDoc.subChapters ? existingDoc.subChapters : []
      const issubchapter_same = subChaptersExistingArray.length == subChaptersNewArray.length && subChaptersExistingArray.every((element, index) => element === subChaptersNewArray[index]);

      if (!iscluster_same || !ischapter_same || !issubchapter_same) {
        const updatedClustersTypes = mlDBController.update('MlProcessMapping', {
          processDocuments: {
            $exists: true,
            $elemMatch: {
              documentId: existingDoc._id && existingDoc._id
            }
          }
        }, {
          processDocuments: { documentId: existingDoc._id && existingDoc._id }
        }, { $pull: true, multi: true }, context)
      }

      /**
       * @ if validity is changed when updating Document Mapping
       * @ Particular document  need to be updated from process documents with reference to document id
       * @ DocumentId-Primary key
       * @ Model-ProcessMapping
       */
      const validityNewValue = args.document && args.document.validity ? args.document.validity : null
      const validityExistingValue = existingDoc && existingDoc.validity ? existingDoc.validity : []
      if ((new Date(validityNewValue).getTime() != new Date(validityExistingValue).getTime())) {
        MlProcessMapping.find().forEach((doc) => {
          MlProcessMapping.update(
            {
              _id: doc._id,
              processDocuments: {
                $elemMatch: { documentId: existingDoc._id }
              }
            },
            { $set: { 'processDocuments.$.validity': validityNewValue } }
          );
        })
      }
    }
    if (error || manditioryStatusError) {
      const code = 401;
      const response = new MlRespPayload().errorPayload('Cannot update as existing process documents are mandatory', code);
      return response;
    }
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlQueryResolver.findDocument = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.documentId) {
    const id = args.documentId;
    const response = MlDocumentMapping.findOne({ documentId: id });
    return response;
  }
}
MlResolver.MlQueryResolver.findDocuments = (obj, args, context, info) => {
  // TODO : Authorization
  const response = MlDocumentMapping.find({}).fetch();
  return response;
}
MlResolver.MlQueryResolver.findProcessDocuments = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.kycId && args.processId) {
    const kycId = args.kycId;
    const processId = args.processId
    const response = MlProcessMapping.findOne({ _id: processId });
    if (response) {
      const documents = response.documents;
      const clusterId = response.clusters;
      const chapterId = response.chapters;
      const subChapterId = response.subChapters;
      let docIds = [],
        data = [];
      for (let i = 0; i < documents.length; i++) {
        if (documents[i].category == kycId && documents[i].isActive == true) {
          docIds.push(documents[i].type)
        }
      }
      const uniquedocId = docIds.filter((elem, index, self) => index == self.indexOf(elem))
      if (uniquedocId.length >= 1) {
        const date = new Date();
        date.setHours(0, 0, 0, 0)
        for (let i = 0; i < uniquedocId.length; i++) {
          const Documentdata = MlDocumentMapping.find({
            $and: [{
              kycCategory: { $in: [kycId] },
              documentType: { $in: [uniquedocId[i]] },
              clusters: { $in: clusterId },
              chapters: { $in: chapterId },
              subChapters: { $in: subChapterId },
              $or: [{ validity: null }, { validity: { $gte: date } }],
              // validity : {"$gte": new Date()},
              isActive: true
            }]
          }).fetch();

          if (Documentdata.length >= 1) {
            Documentdata.map((doc, index) => {
              doc.documentType = [];
              Documentdata[index].documentType[0] = uniquedocId[i]
            });
            for (let j = 0; j < Documentdata.length; j++) {
              data.push(Documentdata[j])
            }
          } else {
            const date = new Date();
            date.setHours(0, 0, 0, 0)
            const DocumentdataDetails = MlDocumentMapping.find({
              $and: [{
                kycCategory: { $in: [kycId] },
                documentType: { $in: [uniquedocId[i]] },
                clusters: { $in: ['all'] },
                chapters: { $in: ['all'] },
                subChapters: { $in: ['all'] },
                $or: [{ validity: null }, { validity: { $gte: date } }],
                // validity : {"$gte": new Date()},
                isActive: true
              }]
            }).fetch();
            DocumentdataDetails.map((doc, index) => {
              doc.documentType = [];
              DocumentdataDetails[index].documentType[0] = uniquedocId[i]
            });
            for (let j = 0; j < DocumentdataDetails.length; j++) {
              data.push(DocumentdataDetails[j])
            }
          }
        }
      }

      data.map((doc, index) => {
        const allowableFormatData = MlDocumentFormats.find({ _id: { $in: doc.allowableFormat } }).fetch() || [];
        const allowableFormatNames = []; // @array of strings
        allowableFormatData.map((doc) => {
          allowableFormatNames.push(doc.docFormatName)
        });
        data[index].allowableFormat = allowableFormatNames || [];
      });
      return data;
    }
  }
}


MlResolver.MlQueryResolver.fetchKycDocProcessMapping = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.documentTypeId && args.clusterId && args.chapterId && args.subChapterId) {
    const id = args.documentTypeId;
    const clusterId = args.clusterId;
    const chapterId = args.chapterId;
    const subChapterId = args.subChapterId;
    clusterId.push('all');
    chapterId.push('all');
    subChapterId.push('all');
    let data = [];
    if (clusterId.length == 1 && clusterId[0] == 'all' && chapterId[0] == 'all' && subChapterId[0] == 'all') {
      data = MlDocumentMapping.find({ documentType: { $in: [id] }, isActive: true }).fetch();
    } else {
      let count = 1
      if (clusterId.length >= 1) {
        for (let i = 0; i < clusterId.length; i++) {
          const docResult = MlDocumentMapping.find({
            clusters: { $in: [clusterId[i]] },
            isActive: true
          }).fetch();
          if (docResult.length >= 1) {
            count++
          }
        }
      }
      if (clusterId.length == (count - 1)) {
        data = MlDocumentMapping.find({
          documentType: { $in: [id] },
          clusters: { $in: clusterId },
          chapters: { $in: chapterId },
          subChapters: { $in: subChapterId },
          isActive: true
        }).fetch();
        if (data.length < 1) {
          data = MlDocumentMapping.find({
            documentType: { $in: [id] },
            clusters: { $in: ['all'] },
            chapters: { $in: ['all'] },
            subChapters: { $in: ['all'] },
            isActive: true
          }).fetch();
        }
      }
    }
    const kycId = []
    data.map((doc, index) => {
      const kycCategory = doc.kycCategory
      kycCategory.map((kyc) => {
        kycId.push(kyc)
      });
      /* const kycCategoryData = MlDocumentCategories.find( { _id: { $in: doc.kycCategory } } ).fetch() || [];
      let allowableFormatNames = [];  //@array of strings
      allowableFormatData.map(function (doc) {
        allowableFormatNames.push(doc.docFormatName)
      });
      data[index].allowableFormat = allowableFormatNames || []; */
    });
    if (kycId.length >= 1) {
      console.log(kycId)
      const uniqueKyc = _.uniq(kycId, (item, key, a) => item.a);
      console.log(uniqueKyc)
      data = MlDocumentCategories.find({ _id: { $in: uniqueKyc } }).fetch() || [];
    }
    return data;
  }
}

