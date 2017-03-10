import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash'
import MlAdminUserContext from '../../../mlAuthorization/mlAdminUserContext';

// // MlResolver.MlMutationResolver['updateCommunityDef'] = (obj, args, context, info) =>{
// //     // check(args.communityDef, Object)
// //         //TODO : Duplicate Community Identification
// //         // TODO : Authorization
// //         // let communityDef = MlCommunityDefinition.findOne({_id:args.community.communityDefId});
// //         // let community = {...args.community, communityDefCode: communityDef.code, communityDefName:communityDef.name};
// //         // let id = MlCommunity.insert({...communityDef});
// //         if (args._id) {
// //           var id= args._id;
// //           let updatedResponse= MlCommunityDefinition.update(id, {$set: args.communityDef});
// //           return updatedResponse
// //         }
// //         // if(id){
// //         //     let code = 200;
// //         //     let result = {communityId: id}
// //         //     var response= JSON.stringify(new MlRespPayload().successPayload(result, code));
// //         //     return response;
// //         // }
// //
// // }
MlResolver.MlQueryResolver['FetchMapData'] = (obj, args, context, info) => {
  // TODO : Authorization
  let query={};
  switch(args.moduleName){
    case "cluster":
      query={"clusterId":args.id};
      break;
    case "chapter":
      query={"chapterId":args.id};
      break;
    case "subChapter":
      query={"subChapterId":args.id};
      break;
    case "community":
      query={"communityDefId":args.id};
      break;
    default:
      query={"noSuchQuery":args.id};
  }
  query.isActive=true;
  let communityData=MlCommunityDefinition.find({isActive:true}).fetch();
  let response=[];
  _.each(communityData,function (item,value) {
    query.communityDefId=item._id;
    response.push({
      key: item._id,
      count: MlCommunity.find(query).count()
    })
  });
    return response;
};

MlResolver.MlQueryResolver['fetchCommunities'] = (obj, args, context, info) =>
{
    // TODO : Authorization

    let query;
    let communities = [];

    if(!context.userId){
        return {data:null}
    }
    let userProfile = new MlAdminUserContext().userProfileDetails(context.userId);
    if(!userProfile||!userProfile.hierarchyLevel){
        return {data:null}
    }

    let userhierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});
    if(!userhierarchy){
      return {data:null}
    }

    let clusterId = args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userhierarchy.isParent) ? args.clusterId : "";
    let chapterId = args.chapterId && ((_.find(userProfile.defaultChapters, args.chapterId)) || userhierarchy.isParent) ? args.chapterId: "";
    let subChapterId = args.subChapterId && ((_.find(userProfile.defaultSubChapters, args.subChapterId)) || userhierarchy.isParent) ? args.subChapterId: ""

    if(clusterId != "" && chapterId != "" && subChapterId != ""){
        query= {"$and":[{clusterId:clusterId, chapterId:chapterId, subChapterId:subChapterId, hierarchyCode:"SUBCHAPTER"}]};
    }
    else if(clusterId != "" && chapterId != "" ){
        query= {"$and":[{clusterId:clusterId, chapterId:chapterId, hierarchyCode:"CHAPTER"}]};
    }
    else if(clusterId != ""){
        query= {"$and":[{clusterId:clusterId, hierarchyCode:"CLUSTER"}]};
    }
    else if(userhierarchy.isParent){
        query= {"hierarchyCode":"PLATFORM"};
    }

    let communitiesAccess = MlCommunityAccess.find(query).fetch();

    communitiesAccess.map(function (communityAccess) {
        let community = {};
        community["name"] = communityAccess.communityDefName;
        community["displayName"] = communityAccess.displayName;
        community["code"] = communityAccess.communityDefCode;
        community["showOnMap"] = communityAccess.showOnMap;
        community["isActive"] = communityAccess.isActive;
        community["communityImageLink"] = communityAccess.communityImageLink;
        communities.push(community);
    })
    return {data:communities, totalRecords:communities&&communities.length?communities.length:0};
}
MlResolver.MlQueryResolver['fetchCommunityDef'] = (obj, args, context, info) =>
{
    // TODO : Authorization
    let clusterQuery,
      chapterQuery,
      subChapterQuery,
      community = {},
      communitiesAccess,
      communityAccess,
      clusters = [],
      chapters = [],
      subChapters = [];

    if(!args.communityId)
        return community

    if(!context.userId){
        return community
    }

    let userProfile = new MlAdminUserContext().userProfileDetails(context.userId);
    if(!userProfile||!userProfile.hierarchyLevel){
      return community
    }

    let userhierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});
    if(!userhierarchy){
      return community
    }

    let clusterId = args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userhierarchy.isParent) ? args.clusterId : "";
    let chapterId = args.chapterId && ((_.find(userProfile.defaultChapters, args.chapterId)) || userhierarchy.isParent) ? args.chapterId: "";
    let subChapterId = args.subChapterId && ((_.find(userProfile.defaultSubChapters, args.subChapterId)) || userhierarchy.isParent) ? args.subChapterId: ""

    if(clusterId != ""){
        clusterQuery = {"$and":[{clusterId:clusterId, hierarchyCode:"CLUSTER", communityDefCode:args.communityId, "isActive":true}]};
        chapterQuery = {"$and":[{clusterId:clusterId, hierarchyCode:"CHAPTER", communityDefCode:args.communityId, "isActive":true}]};
        subChapterQuery = {"$and":[{clusterId:clusterId, hierarchyCode:"SUBCHAPTER", communityDefCode:args.communityId, "isActive":true}]};
        communityAccess = MlCommunityAccess.findOne(clusterQuery);
        communitiesAccess = MlCommunityAccess.find(chapterQuery).fetch();
        chapters = communitiesAccess && _.map(communitiesAccess, 'chapterId');
        subChapters = communitiesAccess && _.map(communitiesAccess, 'subChapterId');

    }

    if(chapterId != "" ){
        chapterQuery = {"$and":[{chapterId:chapterId, hierarchyCode:"CHAPTER", communityDefCode:args.communityId, "isActive":true}]};
        subChapterQuery = {"$and":[{chapterId:chapterId, hierarchyCode:"SUBCHAPTER", communityDefCode:args.communityId, "isActive":true}]};
        communityAccess = MlCommunityAccess.findOne(chapterQuery);
        communitiesAccess = MlCommunityAccess.find(subChapterQuery).fetch();
        chapters = communitiesAccess && _.map(communitiesAccess, 'chapterId');
        subChapters = communitiesAccess && _.map(communitiesAccess, 'subChapterId');
    }
    if(subChapterId != ""){
      subChapterQuery = {"$and":[{subChapterId:subChapterId, hierarchyCode:"SUBCHAPTER", communityDefCode:args.communityId, "isActive":true}]};
      communityAccess = MlCommunityAccess.findOne(subChapterQuery);
      communitiesAccess = MlCommunityAccess.find(subChapterQuery).fetch();
      subChapters = communitiesAccess && _.map(communitiesAccess, 'subChapterId');
    }

    else if(userhierarchy.isParent){
      clusterQuery = {"$and":[{hierarchyCode:"CLUSTER", communityDefCode:args.communityId, "isActive":true}]};
      chapterQuery = {"$and":[{hierarchyCode:"CHAPTER", communityDefCode:args.communityId, "isActive":true}]};
      subChapterQuery = {"$and":[{hierarchyCode:"SUBCHAPTER", communityDefCode:args.communityId, "isActive":true}]};
      communityAccess = MlCommunityAccess.findOne({"$and":[{"hierarchyCode":"PLATFORM", "communityDefCode":args.communityId}]});
      communitiesAccess = MlCommunityAccess.find(clusterQuery).fetch();
      clusters = communitiesAccess && _.map(communitiesAccess, 'clusterId');
      communitiesAccess = MlCommunityAccess.find(chapterQuery).fetch();
      chapters = communitiesAccess && _.map(communitiesAccess, 'chapterId');
      communitiesAccess = MlCommunityAccess.find(subChapterQuery).fetch();
      subChapters = communitiesAccess && _.map(communitiesAccess, 'subChapterId');

    }

    //platform admin
    // if(hierarchy.isParent===true){
    //     communityAccess = MlCommunityAccess.findOne({"$and":[{"hierarchyCode":"PLATFORM", "communityDefCode":args.communityId, "isActive":true}]});
    //     communitiesAccess = MlCommunityAccess.find({"$and":[{"hierarchyCode":{"$ne":"PLATFORM"},"communityDefCode":args.communityId, "isActive":true}]}).fetch();
    //     clusters = communitiesAccess && _.map(communitiesAccess, 'clusterId');
    // }

    if(communityAccess){
        community["name"] = communityAccess.communityDefName;
        community["aboutCommunity"] = communityAccess.about;
        community["displayName"] = communityAccess.displayName;
        community["code"] = communityAccess.communityDefCode;
        community["showOnMap"] = communityAccess.showOnMap;
        community["isActive"] = communityAccess.isActive;
        community["communityImageLink"] = "";
        community["clusters"] = clusters;
        community["chapters"] = chapters;
        community["subchapters"] = subChapters;
    }
    return community;
}
//
// MlResolver.MlQueryResolver['fetchCommunitiesDef'] = (obj, args, context, info) => {
//     let result = MlCommunityAccess.find({"isActive": true}).fetch();
//     return {data:result, totalRecords:result&&result.length?result.length:0}
// }
//
// MlResolver.MlQueryResolver['fecthCommunitiesAccess'] = (obj, args, context, info) => {
//
// }
//
// MlResolver.MlQueryResolver['fecthCommunityDef'] = (obj, args, context, info) =>
// {
//     let communityAccess = MlCommunityAccess.find({"$and":[{"hierarchyCode":{"$ne":"PLATFORM"}}, {"isActive":true}, {"communityDefId":args.communityId}]}).fetch();
//     let clusters;
//     if(communityAccess && communityAccess.length > 0){
//         clusters = _.map(communityAccess, 'clusterId')
//         let chapters = _.map(communityAccess, ['chapterId'])
//     }
//     let result = MlCommunityAccess.findOne({"_id": args.communityId});
//     result["clusters"] = clusters;
//     return result;
// }
//
// MlResolver.MlQueryResolver['fecthCommunityAccess'] = (obj, args, context, info) => {
//
// }
//
// MlResolver.MlQueryResolver['fetchActiveCommunityAccess'] = (obj, args, context, info) => {
//     let result = MlCommunityAccess.find({"isActive":true}).fetch();
//     return result;
// }
//
// MlResolver.MlMutationResolver['updateCommunityDef'] = (obj, args, context, info) => {
//     check(args.communityId, String)
//     let community = MlCommunityAccess.findOne({"_id":args.communityId});
//     if(community){
//         let clean = MlCommunityAccess.clean(args.community)
//         let isDiff = false;
//         let resp;
//         for( key in clean){
//             if(community[key] != clean [key]){
//                 isDiff = true;
//                 community[key] = clean [key]
//             }
//         }
//         if(isDiff){
//             resp = MlCommunityAccess.update({_id:args.communityId}, {$set:community}, {upsert:true})
//         }
//
//         if(args.clusters && args.clusters.length > 0)
//         {
//             let clusters = args.clusters;
//             clusters.map(function (clusterId) {
//                 let communityAccess = MlCommunityAccess.findOne({"$and":[{"clusterId":clusterId}, {"communityDefId":args.communityId}, {"hierarchyCode":"CLUSTER"}]})
//                 if(communityAccess){
//                     communityAccess.isActive = community.isActive;
//                     resp = MlCommunityAccess.update({_id:communityAccess._id}, {$set:communityAccess}, {upsert:true})
//                 }
//             })
//         }
//
//         // if(args.chapters && args.chapters.length > 0){
//         //     let clusters = args.chapters;
//         //     clusters.map(function (chapterId) {
//         //         let communityAccess = MlCommunityAccess.findOne({"$and":[{"clusterId":clusterId}, {"communityDefId":args.communityId}, {"hierarchyCode":"CLUSTER"}]})
//         //         if(communityAccess){
//         //           communityAccess.isActive = community.isActive;
//         //           resp = MlCommunityAccess.update({_id:communityAccess._id}, {$set:communityAccess}, {upsert:true})
//         //         }
//         //     })
//         // }
//
//         if(resp) {
//             let response = new MlRespPayload().successPayload("Community updated successfully", 200);
//             return response;
//         }
//
//         let response = new MlRespPayload().errorPayload("Some thing went wrong while updating your community", 400);
//         return response;
//     }
//
//     let response = new MlRespPayload().errorPayload("Community not found", 404);
//     return response;
// }
//
// MlResolver.MlMutationResolver['updateCommunityAccess'] = (obj, args, context, info) => {
//
// }
//
MlResolver.MlMutationResolver['createCommunityAccess'] = (obj, args, context, info) => {
    let hierarchy;
    let levelCode;
    let community = {};
    if(args.clusterId != undefined && args.chapterId != undefined && args.subChapterId != undefined ){
        levelCode = "SUBCHAPTER"
    }
    else if(args.clusterId != undefined && args.chapterId != undefined ){
        levelCode = "CHAPTER"
    }
    else if(args.clusterId != undefined){
        levelCode = "CLUSTER"
    }
    hierarchy = MlHierarchy.findOne({code:levelCode})

    let communitiesDef = MlCommunityAccess.find({"$and":[{"hierarchyCode":"PLATFORM"}, {"isActive":true}]}).fetch()
    for(var i = 0; i < communitiesDef.length; i++){
        if(communitiesDef[i].isActive){
            let community = {
                clusterId:args.clusterId,
                chapterId:args.chapterId || null,
                subChapterId:args.subChapterId || null,
                communityId:"",
                communityDefId:communitiesDef[i].communityDefId,
                communityDefCode:communitiesDef[i].communityDefCode,
                communityDefName:communitiesDef[i].communityDefName,
                communityImageLink:communitiesDef[i].communityImageLink,
                showOnMap:false,
                isRoot: false,
                isLeaf:false,
                isActive:false,
                isAvailableByParent:communitiesDef[i].isActive,
                hierarchyLevel:hierarchy.level,
                hierarchyCode:hierarchy.code
            }

            MlCommunityAccess.insert(community)
        }
    }
}

MlResolver.MlMutationResolver['createCommunity'] = (obj, args, context, info) => {
  let communitiesDef = MlCommunityAccess.find({"subChapterId":args.subChapterId}).fetch()
  for(var i = 0; i < communitiesDef.length; i++){
    if(communitiesDef[i]){
      let community = {
        communityName:communitiesDef[i].communityDefName,
        communityDisplayName:communitiesDef[i].communityDefName,
        communityDescription:"",
        communityDefId:communitiesDef[i].communityDefId,
        communityDefCode:communitiesDef[i].communityDefCode,
        communityDefName:communitiesDef[i].communityDefName,
        communityAccessId:communitiesDef[i]._id,
        clusterId:args.clusterId,
        clusterName:args.clusterName,
        chapterId:args.chapterId,
        chapterName:args.chapterName,
        subChapterId:args.subChapterId,
        subChapterName:args.subChapterName,
        communityCode:communitiesDef[i].communityDefCode,
        communityImageLink:communitiesDef[i].communityImageLink,
        showOnMap:communitiesDef[i].showOnMap,
        isActive:communitiesDef[i].isActive,
        hierarchyLevel:communitiesDef[i].hierarchyLevel,
        hierarchyCode:communitiesDef[i].hierarchyCode
      }

      MlCommunity.insert(community)
    }
  }
}

MlResolver.MlMutationResolver['updateCommunityDef'] = (obj, args, context, info) => {
    let doEdit = false
    let query,
      community = {},
      communitiesAccess,
      communityAccess,
      userHierarchy,
      clusters = [],
      chapters = [],
      subchapters = [],
      resp,
      levelCode = "";

    if(!args.communityId)
        return new MlRespPayload().errorPayload("Failed to update community", 400);
    if(!context.userId){
        return new MlRespPayload().errorPayload("Failed to update community", 400);
    }

    let userProfile = new MlAdminUserContext().userProfileDetails(context.userId);
    if(!userProfile||!userProfile.hierarchyLevel){
      return new MlRespPayload().errorPayload("Failed to update community", 400);
    }

    userHierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});
    if(!userHierarchy){
      return new MlRespPayload().errorPayload("Failed to update community", 400);
    }

    let clusterId = args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userhierarchy.isParent) ? args.clusterId : "";
    let chapterId = args.chapterId && ((_.find(userProfile.defaultChapters, args.chapterId)) || userhierarchy.isParent) ? args.chapterId: "";
    let subChapterId = args.subChapterId && ((_.find(userProfile.defaultSubChapters, args.subChapterId)) || userhierarchy.isParent) ? args.subChapterId: ""



    if(clusterId != "" && chapterId != "" && subChapterId != ""){
      levelCode = "SUBCHAPTER"
    }
    else if(clusterId != "" && chapterId != "" ){
      levelCode = "CHAPTER"
    }
    else if(clusterId != ""){
      levelCode = "CLUSTER"
    }
    else if(userHierarchy.isParent){
      levelCode = "PLATFORM"
    }

    let hierarchy = (levelCode && MlHierarchy.findOne({code:levelCode})) || "";
    if(hierarchy != "" && (hierarchy.isParent || userHierarchy.hierarchyLevel <= hierarchy.hierarchyLevel)) {
      doEdit = true;
    }

    if(doEdit)
    {
        communityAccess = MlCommunityAccess.findOne({"$and":[{"hierarchyCode":userHierarchy.code, "communityDefCode":args.communityId}]});
        if(communityAccess){
            let isUpdate = false;

            if(communityAccess.about != args.community.aboutCommunity){
                isUpdate = true;
                communityAccess.about = args.community.aboutCommunity
            }

            if(communityAccess.isActive != args.community.isActive){
                isUpdate = true;
                communityAccess.isActive = args.community.isActive
            }

          if(communityAccess.showOnMap != args.community.showOnMap){
            isUpdate = true;
            communityAccess.showOnMap = args.community.showOnMap
          }

          if(isUpdate == true)
            resp = MlCommunityAccess.update({"_id":communityAccess._id}, {"$set":communityAccess}, {upsert:true})
        }

        communitiesAccess = MlCommunityAccess.find({"$and":[{communityDefCode:args.communityId, "isActive":true, "hierarchyCode":{"$ne":"PLATFORM"}}]}).fetch();
        if(communitiesAccess.length == 0){
            clusters = {isActive: true, difference:args.clusters || []}
            chapters = {isActive: true, difference:args.chapters || []};
            subchapters = {isActive: true, difference:args.subchapters || []};
        }
        else{
          clusterids = clusterId == "" && _.map(_.filter(communitiesAccess, {hierarchyCode:"CLUSTER"}), "clusterId") || [];
          clusters = new MlRespPayload().getArrayDifference(clusterids, args.clusters)

          chapterids = chapterId == "" && _.map(_.filter(communitiesAccess, {hierarchyCode:"CHAPTER"}), "chapterId") || [];
          chapters = new MlRespPayload().getArrayDifference(chapterids, args.chapters)

          subchapterids = subChapterId == "" && _.map(_.filter(communitiesAccess, {hierarchyCode:"SUBCHAPTER"}), "subChapterId") || [];
          subchapters = new MlRespPayload().getArrayDifference(subchapterids, args.subchapters)
        }

        clusters.difference.map(function(clusterId){
          resp = MlCommunityAccess.update({"$and":[{communityDefCode:args.communityId}, {clusterId:clusterId}, {"hierarchyCode":"CLUSTER"}]}, {$set:{isActive:clusters.isActive}})
        })

        chapters.difference.map(function(chapterId){
          resp = MlCommunityAccess.update({"$and":[{communityDefCode:args.communityId}, {chapterId:chapterId}, {"hierarchyCode":"CHAPTER"}]}, {$set:{isActive:chapters.isActive}})
        })

        subchapters.difference.map(function(subChapterId){
          resp = MlCommunityAccess.update({"$and":[{communityDefCode:args.communityId}, {subChapterId:subChapterId}, {"hierarchyCode":"SUBCHAPTER"}]}, {$set:{isActive:subchapters.isActive}})
          resp = MlCommunity.update({"$and":[{communityDefCode:args.communityId}, {subChapterId:subChapterId}, {"hierarchyCode":"SUBCHAPTER"}]}, {$set:{isActive:subchapters.isActive}})
        })

        if(resp)
          return new MlRespPayload().successPayload("Successfully updated", 200);

    }

    return new MlRespPayload().errorPayload("Failed to update community", 400);
}


// MlResolver.MlMutationResolver['createCommunity'] = (obj, args, context, info) => {
//
// }
