/**
 * Created by venkatsrinag on 11/5/17.
 */

import MlResolver from '../../commons/mlResolverDef';
import MlRespPayload from '../../commons/mlPayload';
import MlUserContext from '../../MlExternalUsers/mlUserContext';

MlResolver.MlQueryResolver['fetchOffice'] = (obj, args, context, info) => {
  let myOffice = [];
  if (context.userId) {
    myOffice = mlDBController.find('MlOffice', {userId: context.userId}).fetch()
    return myOffice
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Not a Valid user", code);
    return response;
  }
}

MlResolver.MlQueryResolver['fetchOfficeMembers'] = (obj, args, context, info) => {
  let officeMembers = [];
}

MlResolver.MlMutationResolver['createOffice'] = (obj, args, context, info) => {
  var ret = "";
    try {
        if(args.myOffice){
            let userId = context.userId;
            let myOffice = args.myOffice;
            let profile = new MlUserContext(userId).userProfileDetails(userId)
            myOffice['userId'] = context.userId;
            myOffice['isActive'] = false;
            myOffice['createdDate'] = new Date();
            if(profile){
              myOffice["clusterId"] = profile.clusterId;
              myOffice["clusterName"] = profile.clusterName;
              myOffice["chapterId"] = profile.chapterId;
              myOffice["chapterName"] = profile.chapterName;
              myOffice["subChapterId"] = profile.subChapterId;
              myOffice["subChapterName"] = profile.subChapterName;
              myOffice["communityId"] = profile.communityId;
              myOffice["communityName"] =profile.communityName;
            }
            ret = mlDBController.insert('MlOffice', myOffice, context)
            if(!ret){
                let code = 400;
                let response = new MlRespPayload().successPayload("Failed To Create Office", code);
                return response;
            } else {
              let officeTrans = {
                officeId: ret,
                userId: userId,
                clusterId: profile.clusterId,
                clusterName: profile.clusterName,
                chapterId: profile.chapterId,
                chapterName: profile.chapterName,
                subChapterId: profile.subChapterId,
                subChapterName: profile.subChapterName,
                communityId: profile.communityId,
                communityName: profile.communityName,
                dateTime : new Date(),
                transactionId: 'TransId',
                status: 'Pending'
              };
              let officeTransResponse = mlDBController.insert('MlOfficeTransaction', officeTrans, context);
              if(!officeTransResponse){
                let code = 400;
                let response = new MlRespPayload().successPayload("Failed To Create Office", code);
                return response;
              }
              let code = 200;
              let response = new MlRespPayload().successPayload("Created Office", code);
              return response;
            }
        }
    }
    catch (e){
        let code = 400;
        let response = new MlRespPayload().successPayload(e.message, code);
        return response;
    }

  let code = 200;
  let response = new MlRespPayload().successPayload(ret, code);
  return response;
}

MlResolver.MlMutationResolver['updateOffice'] = (obj, args, context, info) => {
}
