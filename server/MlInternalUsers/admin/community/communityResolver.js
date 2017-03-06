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
// MlResolver.MlQueryResolver['FetchMapData'] = (obj, args, context, info) => {
//   // TODO : Authorization
//   let query={};
//   switch(args.moduleName){
//     case "cluster":
//       query={"clusterId":args.id};
//       break;
//     case "chapter":
//       query={"chapterId":args.id};
//       break;
//     case "subChapter":
//       query={"subChapterId":args.id};
//       break;
//     case "community":
//       query={"communityDefId":args.id};
//       break;
//     default:
//       query={"noSuchQuery":args.id};
//   }
//   query.isActive=true;
//   let communityData=MlCommunityDefinition.find({isActive:true}).fetch();
//   let response=[];
//   _.each(communityData,function (item,value) {
//     query.communityDefId=item._id;
//     response.push({
//       key: item._id,
//       count: MlCommunity.find(query).count()
//     })
//   });
//     return response;
// }
MlResolver.MlQueryResolver['fetchCommunities'] = (obj, args, context, info) => {
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

    hierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});
    if(!hierarchy){
      return {data:null}
    }

    //platform admin
    if(hierarchy.isParent===true){
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
        community["communityImageLink"] = "";
        communities.push(community);
    })
    return {data:communities, totalRecords:communities&&communities.length?communities.length:0};
}
MlResolver.MlQueryResolver['fetchCommunityDef'] = (obj, args, context, info) =>
{
    // TODO : Authorization

    let query,
    community = {},
    communitiesAccess,
    communityAccess,
    clusters = [];

    if(!args.communityId)
        return community

    if(!context.userId){
      return community
    }
    let userProfile = new MlAdminUserContext().userProfileDetails(context.userId);
    if(!userProfile||!userProfile.hierarchyLevel){
      return community
    }

    hierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});
    if(!hierarchy){
      return community
    }

    //platform admin
    if(hierarchy.isParent===true){
        communityAccess = MlCommunityAccess.findOne({"$and":[{"hierarchyCode":"PLATFORM", "communityDefName":args.communityId, "isActive":true}]});
        communitiesAccess = MlCommunityAccess.find({"$and":[{"hierarchyCode":{"$ne":"PLATFORM"},"communityDefName":args.communityId, "isActive":true}]}).fetch();
        clusters = communitiesAccess && _.map(communitiesAccess, 'clusterId');
    }

    if(communityAccess){
        community["name"] = communityAccess.communityDefName;
        community["displayName"] = communityAccess.displayName;
        community["code"] = communityAccess.communityDefCode;
        community["showOnMap"] = communityAccess.showOnMap;
        community["isActive"] = communityAccess.isActive;
        community["communityImageLink"] = "";
        community["clusters"] = clusters;
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

MlResolver.MlMutationResolver['updateCommunityDef'] = (obj, args, context, info) => {

}

// MlResolver.MlMutationResolver['createCommunity'] = (obj, args, context, info) => {
//
// }
