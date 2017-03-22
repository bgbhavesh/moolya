import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash'
import MlAdminContextQueryConstructor from '../core/repository/mlAdminContextQueryConstructor';
import MlAdminUserContext from '../../../mlAuthorization/mlAdminUserContext';

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
      count: MlCommunity.find(query).count(),
      icon: item.communityImageLink
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
    if(!userProfile|| (!userProfile.hierarchyLevel && userProfile.hierarchyLevel != 0)){
        return {data:null}
    }

    let userhierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});
    if(!userhierarchy){
      return {data:null}
    }

    let clusterId = (!args.clusterId && !userhierarchy.isParent ? args.clusterId = userProfile.defaultProfileHierarchyRefId: "") || (args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userhierarchy.isParent) ? args.clusterId : "");
    let chapterId = (!args.chapterId && !userhierarchy.isParent ? args.chapterId = ((_.find(userProfile.defaultChapters, args.chapterId))!="all"): "") || (args.chapterId && ((userProfile.defaultChapters.indexOf(args.chapterId) > -1) || userhierarchy.isParent) ? args.chapterId: "");
    let subChapterId = (!args.subChapterId && !userhierarchy.isParent ? args.subChapterId = ((_.find(userProfile.defaultSubChapters, args.subChapterId))!="all"): "") || (args.subChapterId && ((userProfile.defaultSubChapters.indexOf(args.subChapterId) > -1) || userhierarchy.isParent) ? args.subChapterId: "");

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
        let platformCommunity = MlCommunityAccess.findOne({"hierarchyCode":"PLATFORM", "communityDefCode":communityAccess.communityDefCode});
        let community = {};
        if(!platformCommunity.isActive)
          communityAccess.isActive  = false

        community["name"] = communityAccess.communityDefName;
        community["displayName"] = communityAccess.displayName;
        community["code"] = communityAccess.communityDefCode;
        community["showOnMap"] = communityAccess.showOnMap;
        community["isActive"] = communityAccess.isActive;
        community["communityImageLink"] = communityAccess.communityImageLink;
        community["clusters"] = [communityAccess.clusterId];
        community["chapters"] = [communityAccess.chapterId];
        community["subchapters"] = [communityAccess.subChapterId];
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
      subChapters = [],
      subChapterName = "",
      clusterName = "",
      chapterName = "",
      clusterId = "",
      chapterId = "",
      subChapterId = "";

    if(!args.communityId)
        return community

    if(!context.userId){
        return community
    }

    let userProfile = new MlAdminUserContext().userProfileDetails(context.userId);
    if(!userProfile||(!userProfile.hierarchyLevel && userProfile.hierarchyLevel != 0)){
      return community
    }

    let userhierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});
    if(!userhierarchy){
      return community
    }

    // let clusterId = args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userhierarchy.isParent) ? args.clusterId : "";
    // let chapterId = args.chapterId && ((_.find(userProfile.defaultChapters, args.chapterId)) || userhierarchy.isParent) ? args.chapterId: "";
    // let subChapterId = args.subChapterId && ((_.find(userProfile.defaultSubChapters, args.subChapterId)) || userhierarchy.isParent) ? args.subChapterId: ""
    clusterId = (!args.clusterId && !userhierarchy.isParent ? args.clusterId = userProfile.defaultProfileHierarchyRefId: "") || (args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userhierarchy.isParent) ? args.clusterId : "");
    chapterId = (!args.chapterId && !userhierarchy.isParent ? args.chapterId = ((_.find(userProfile.defaultChapters, args.chapterId))!="all"): "") || (args.chapterId && ((userProfile.defaultChapters.indexOf(args.chapterId) > -1) || userhierarchy.isParent) ? args.chapterId: "");
    subChapterId = (!args.subChapterId && !userhierarchy.isParent ? args.subChapterId = ((_.find(userProfile.defaultSubChapters, args.subChapterId))!="all"): "") || (args.subChapterId && ((userProfile.defaultSubChapters.indexOf(args.subChapterId) > -1) || userhierarchy.isParent) ? args.subChapterId: "");

    if(clusterId != "" && chapterId != "" && subChapterId != "")
    {
      subChapterQuery = {"$and":[{subChapterId:subChapterId, hierarchyCode:"SUBCHAPTER", communityDefCode:args.communityId, "isActive":true}]};
      communityAccess = MlCommunityAccess.findOne(subChapterQuery);
      communitiesAccess = MlCommunityAccess.find(subChapterQuery).fetch();
      clusters = [clusterId];
      chapters = [chapterId];
      subChapters= [subChapterId];
      let subChapter = MlSubChapters.findOne({_id: subChapterId});
      subChapterName = subChapter.subChapterName;
      clusterName = subChapter.clusterName;
      chapterName = subChapter.chapterName;
    }

    else if(clusterId != "" && chapterId != "" ){
        chapterQuery = {"$and":[{chapterId:chapterId, hierarchyCode:"CHAPTER", communityDefCode:args.communityId, "isActive":true}]};
        subChapterQuery = {"$and":[{chapterId:chapterId, hierarchyCode:"SUBCHAPTER", communityDefCode:args.communityId, "isActive":true}]};
        communityAccess = MlCommunityAccess.findOne(chapterQuery);
        communitiesAccess = MlCommunityAccess.find(subChapterQuery).fetch();
        clusters = [clusterId];
        chapters = [chapterId];
        subChapters = communitiesAccess && _.map(communitiesAccess, 'subChapterId');
    }

    else if(clusterId != ""){
        clusterQuery = {"$and":[{clusterId:clusterId, hierarchyCode:"CLUSTER", communityDefCode:args.communityId, "isActive":true}]};
        chapterQuery = {"$and":[{clusterId:clusterId, hierarchyCode:"CHAPTER", communityDefCode:args.communityId, "isActive":true}]};
        subChapterQuery = {"$and":[{clusterId:clusterId, hierarchyCode:"SUBCHAPTER", communityDefCode:args.communityId, "isActive":true}]};
        communityAccess = MlCommunityAccess.findOne(clusterQuery);
        communitiesAccess = MlCommunityAccess.find(chapterQuery).fetch();
        clusters = [clusterId];
        chapters = communitiesAccess && _.map(communitiesAccess, 'chapterId');
        subChapters = communitiesAccess && _.map(communitiesAccess, 'subChapterId');
        clusterName = MlClusters.findOne({_id: clusterId}).clusterName;

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
        community["clusterName"] = clusterName;
        community["chapterName"] = chapterName;
        community["subChapterName"] = subChapterName;
    }
    return community;
}

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
    if(!userProfile||(!userProfile.hierarchyLevel && userProfile.hierarchyLevel != 0)){
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
