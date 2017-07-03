import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash'
import MlAdminContextQueryConstructor from '../core/repository/mlAdminContextQueryConstructor';
import MlAdminUserContext from '../../../mlAuthorization/mlAdminUserContext';

MlResolver.MlQueryResolver['FetchMapData'] = (obj, args, context, info) => {
  // TODO : Authorization
  let query={};
  var chapterCount=0
  switch(args.moduleName){
    case "cluster":
      query={"clusterId":args.id};
      chapterCount = mlDBController.find('MlChapters', {clusterId:args.id,isActive:true}, context).count();
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
  // let communityData=MlCommunityDefinition.find({isActive:true}).fetch();
  let communityData= mlDBController.find('MlCommunityDefinition', {isActive:true}, context).fetch();
  let response=[];
  _.each(communityData,function (item,value) {
    // query.communityDefId=item._id;
    query.communityDefName = item.name;
    query.isApprove=true;
    if(item.communityImageLink!="ml ml-browser"){
      response.push({
        key: item._id,
        // count: mlDBController.find('MlCommunity', query, context).count(),
        count: mlDBController.find('users', {'profile.externalUserProfiles':{$elemMatch: query}}, context).count(),
        icon: item.communityImageLink
      })
    }
  });
  // count: MlCommunity.find(query).count(),
    let TU = _.map(response, 'count');
    let totalUsers = _.sum(TU);
    response.push({
      key: '123',
      count: totalUsers,
      icon: "ml ml-browser"
    })
  if(chapterCount>=0){
    response.push({
      key: '321',
      count: chapterCount,
      icon: "ml ml-chapter"
    })
  }

    /*let objs = {data:response, totalCount: totalUsers}
    console.log(objs)*/
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

    // let userhierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});
    let userhierarchy = mlDBController.findOne('MlHierarchy', {level:Number(userProfile.hierarchyLevel)}, context)
    if(!userhierarchy){
      return {data:null}
    }

    let clusterId = (!args.clusterId && !userhierarchy.isParent ? args.clusterId = userProfile.defaultProfileHierarchyRefId: "") || (args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userhierarchy.isParent) ? args.clusterId : "");
    let chapterId = (!args.chapterId && !userhierarchy.isParent ? args.chapterId = ((userProfile.defaultChapters.indexOf("all")) >= 0  == "") : "") || (args.chapterId && ((userProfile.defaultChapters.indexOf("all") >= 0 || userProfile.defaultChapters.indexOf(args.chapterId) > -1) || userhierarchy.isParent) ? args.chapterId: "");
    let subChapterId = (!args.subChapterId && !userhierarchy.isParent ? args.subChapterId = ((userProfile.defaultSubChapters.indexOf("all")) >= 0 == "") : "") || (args.subChapterId && ((userProfile.defaultSubChapters.indexOf("all") >= 0 || userProfile.defaultSubChapters.indexOf(args.subChapterId) > -1) || userhierarchy.isParent) ? args.subChapterId: "");

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
    // let communitiesAccess = mlDBController.find('MlCommunityAccess', query, context).fetch();
    communitiesAccess.map(function (communityAccess) {
        // let platformCommunity = MlCommunityAccess.findOne({"hierarchyCode":"PLATFORM", "communityDefCode":communityAccess.communityDefCode});
        let platformCommunity = mlDBController.findOne('MlCommunityAccess', {"hierarchyCode":"PLATFORM", "communityDefCode":communityAccess.communityDefCode}, context)
        let community = {};
        // let iscommunityActive = userProfile.defaultCommunities.indexOf('all') || userProfile.defaultCommunities.indexOf(communityAccess.communityDefCode);
        let iscommunityActive = _.findIndex(userProfile.defaultCommunities, {communityCode:'all'})
        if(iscommunityActive < 0)
            iscommunityActive = _.findIndex(userProfile.defaultCommunities, {communityCode:communityAccess.communityDefCode})

        if(!platformCommunity.isActive || iscommunityActive < 0)
          communityAccess.isActive  = false

        community["name"] = communityAccess.communityDefName;
        community["communityName"] = communityAccess.communityDefName;
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
    context.module = "community";
    return {data:communities, totalRecords:communities&&communities.length?communities.length:0};
}
MlResolver.MlQueryResolver['fetchCommunityDef'] = (obj, args, context, info) =>
{
    // TODO : Authorization
    var clusterQuery,
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

    var userProfile = new MlAdminUserContext().userProfileDetails(context.userId);
    if(!userProfile||(!userProfile.hierarchyLevel && userProfile.hierarchyLevel != 0)){
      return community
    }

    // let userhierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});
    var userhierarchy = mlDBController.findOne('MlHierarchy', {level:Number(userProfile.hierarchyLevel)}, context)
    if(!userhierarchy){
      return community
    }

    // let clusterId = args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userhierarchy.isParent) ? args.clusterId : "";
    // let chapterId = args.chapterId && ((_.find(userProfile.defaultChapters, args.chapterId)) || userhierarchy.isParent) ? args.chapterId: "";
    // let subChapterId = args.subChapterId && ((_.find(userProfile.defaultSubChapters, args.subChapterId)) || userhierarchy.isParent) ? args.subChapterId: ""

    clusterId     = (!args.clusterId && !userhierarchy.isParent ? args.clusterId = userProfile.defaultProfileHierarchyRefId: "") || (args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userhierarchy.isParent) ? args.clusterId : "");
    chapterId     = (args.chapterId && ((userProfile.defaultChapters.indexOf("all") >= 0 || userProfile.defaultChapters.indexOf(args.chapterId) > -1) || userhierarchy.isParent) ? args.chapterId: "");
    subChapterId  = (args.subChapterId && ((userProfile.defaultSubChapters.indexOf("all") >= 0 || userProfile.defaultSubChapters.indexOf(args.subChapterId) > -1) || userhierarchy.isParent) ? args.subChapterId: "");

  // chapterId = (!args.chapterId && !userhierarchy.isParent ? args.chapterId = (_.findIndex(userProfile.defaultChapters, args.chapterId)): "") || (args.chapterId && ((userProfile.defaultChapters.indexOf(args.chapterId) > -1) || userhierarchy.isParent) ? args.chapterId: "");
    // subChapterId = (!args.subChapterId && !userhierarchy.isParent ? args.subChapterId = (_.findIndex(userProfile.defaultSubChapters, args.subChapterId)): "") || (args.subChapterId && ((userProfile.defaultSubChapters.indexOf(args.subChapterId) > -1) || userhierarchy.isParent) ? args.subChapterId: "");


    if(clusterId != "" && chapterId != "" && subChapterId != "")
    {
      subChapterQuery = {"$and":[{subChapterId:subChapterId, hierarchyCode:"SUBCHAPTER", communityDefCode:args.communityId, "isActive":true}]};
      // communityAccess = MlCommunityAccess.findOne(subChapterQuery);
      communityAccess = mlDBController.findOne('MlCommunityAccess', subChapterQuery, context);
      // communitiesAccess = MlCommunityAccess.find(subChapterQuery).fetch();
      communitiesAccess = mlDBController.find('MlCommunityAccess', subChapterQuery, context).fetch();
      clusters = [clusterId];
      chapters = [chapterId];
      subChapters= [subChapterId];
      // let subChapter = MlSubChapters.findOne({_id: subChapterId});
      let subChapter = mlDBController.findOne('MlSubChapters', {_id: subChapterId}, context);
      subChapterName = subChapter.subChapterName;
      clusterName = subChapter.clusterName;
      chapterName = subChapter.chapterName;
    }

    else if(clusterId != "" && chapterId != "" ){
        chapterQuery = {"$and":[{chapterId:chapterId, hierarchyCode:"CHAPTER", communityDefCode:args.communityId, "isActive":true}]};
        subChapterQuery = {"$and":[{chapterId:chapterId, hierarchyCode:"SUBCHAPTER", communityDefCode:args.communityId, "isActive":true}]};
        // communityAccess = MlCommunityAccess.findOne(chapterQuery);
        communityAccess = mlDBController.findOne('MlCommunityAccess', chapterQuery, context);
        // communitiesAccess = MlCommunityAccess.find(subChapterQuery).fetch();
        communitiesAccess = mlDBController.find('MlCommunityAccess', subChapterQuery, context).fetch();
        clusters = [clusterId];
        chapters = [chapterId];
        subChapters = communitiesAccess && _.map(communitiesAccess, 'subChapterId');
    }

    else if(clusterId != ""){
        clusterQuery = {"$and":[{clusterId:clusterId, hierarchyCode:"CLUSTER", communityDefCode:args.communityId, "isActive":true}]};
        chapterQuery = {"$and":[{clusterId:clusterId, hierarchyCode:"CHAPTER", communityDefCode:args.communityId, "isActive":true}]};
        subChapterQuery = {"$and":[{clusterId:clusterId, hierarchyCode:"SUBCHAPTER", communityDefCode:args.communityId, "isActive":true}]};
        // communityAccess = MlCommunityAccess.findOne(clusterQuery);
        communityAccess = mlDBController.findOne('MlCommunityAccess', clusterQuery, context);
        // communitiesAccess = MlCommunityAccess.find(chapterQuery).fetch();
        communitiesAccess = mlDBController.find('MlCommunityAccess', chapterQuery, context).fetch();
        clusters = [clusterId];
        chapters = communitiesAccess && _.map(communitiesAccess, 'chapterId');
        // communitiesAccess = MlCommunityAccess.find(subChapterQuery).fetch();
        communitiesAccess = mlDBController.find('MlCommunityAccess', subChapterQuery, context).fetch();
        subChapters = communitiesAccess && _.map(communitiesAccess, 'subChapterId');
        // clusterName = MlClusters.findOne({_id: clusterId}).clusterName;
        clusterName = mlDBController.findOne('MlClusters', {_id: clusterId}, context).clusterName;
    }

    else if(userhierarchy.isParent){
        clusterQuery = {"$and":[{hierarchyCode:"CLUSTER", communityDefCode:args.communityId, "isActive":true}]};
        communityAccess = mlDBController.findOne('MlCommunityAccess', {"$and":[{"hierarchyCode":"PLATFORM", "communityDefCode":args.communityId}]}, context);
        communitiesAccess = mlDBController.find('MlCommunityAccess', clusterQuery, context).fetch();
        clusters = communitiesAccess && _.map(communitiesAccess, 'clusterId');
        _.each(clusters, function (clusterid) {
            var Chapters = [];
            chapterQuery = {"$and":[{hierarchyCode:"CHAPTER", communityDefCode:args.communityId, clusterId:clusterid, "isActive":true}]};
            communitiesAccess = mlDBController.find('MlCommunityAccess', chapterQuery, context).fetch();
            Chapters = communitiesAccess && _.map(communitiesAccess, 'chapterId');
            chapters = _.concat(chapters, Chapters)
        })

        _.each(chapters, function (chapterid) {
              var SubChapters = [];
              subChapterQuery = {"$and":[{hierarchyCode:"SUBCHAPTER", communityDefCode:args.communityId, chapterId:chapterid, "isActive":true}]};
              communitiesAccess = mlDBController.find('MlCommunityAccess', subChapterQuery, context).fetch();
              SubChapters = communitiesAccess && _.map(communitiesAccess, 'subChapterId');
              subChapters = _.concat(subChapters, SubChapters)
        })
    }


    if(communityAccess){
        community["name"] = communityAccess.communityDefName;
      // community["aboutCommunity"] = communityAccess.about;
        community["aboutCommunity"] = communityAccess.aboutCommunity;
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
    // hierarchy = MlHierarchy.findOne({code:levelCode})
    hierarchy = mlDBController.findOne('MlHierarchy', {code:levelCode}, context)

    // let communitiesDef = MlCommunityAccess.find({"$and":[{"hierarchyCode":"PLATFORM"}, {"isActive":true}]}).fetch()
    let communitiesDef = mlDBController.find('MlCommunityAccess', {"$and":[{"hierarchyCode":"PLATFORM"}, {"isActive":true}]}, context).fetch()
    _.each(communitiesDef, function (community) {
        if(community.isActive){
            var communityObj = {
                clusterId:args.clusterId,
                chapterId:args.chapterId || null,
                subChapterId:args.subChapterId || null,
                communityId:"",
                communityDefId:community.communityDefId,
                communityDefCode:community.communityDefCode,
                communityDefName:community.communityDefName,
                communityImageLink:community.communityImageLink,
                showOnMap:false,
                isRoot: false,
                isLeaf:false,
                isActive:false,
                isAvailableByParent:community.isActive,
                hierarchyLevel:hierarchy.level,
                hierarchyCode:hierarchy.code
            }
            // MlCommunityAccess.insert(community)
            mlDBController.insert('MlCommunityAccess', communityObj, context)
        }
    })
}

MlResolver.MlMutationResolver['createCommunity'] = (obj, args, context, info) => {
  // let communitiesDef = MlCommunityAccess.find({"subChapterId":args.subChapterId}).fetch()
  let communitiesDef = mlDBController.find('MlCommunityAccess', {"subChapterId":args.subChapterId}, context).fetch()
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

      // MlCommunity.insert(community)
      mlDBController.insert('MlCommunity', community, context)
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
        return new MlRespPayload().errorPayload("Failed to update community 1", 400);
    if(!context.userId){
        return new MlRespPayload().errorPayload("Failed to update community 2", 400);
    }

    let userProfile = new MlAdminUserContext().userProfileDetails(context.userId);
    if(!userProfile||(!userProfile.hierarchyLevel && userProfile.hierarchyLevel != 0)){
      return new MlRespPayload().errorPayload("Failed to update community 3", 400);
    }

    userHierarchy = mlDBController.findOne('MlHierarchy', {level:Number(userProfile.hierarchyLevel)}, context)
    if(!userHierarchy){
      return new MlRespPayload().errorPayload("Failed to update community 4", 400);
    }
  // let clusterId = args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userhierarchy.isParent) ? args.clusterId : "";
  // let chapterId = args.chapterId && ((_.find(userProfile.defaultChapters, args.chapterId)) || userhierarchy.isParent) ? args.chapterId: "";
  // let subChapterId = args.subChapterId && ((_.find(userProfile.defaultSubChapters, args.subChapterId)) || userhierarchy.isParent) ? args.subChapterId: ""

  let clusterId = (!args.clusterId && !userHierarchy.isParent ? args.clusterId = userProfile.defaultProfileHierarchyRefId: "") || (args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userHierarchy.isParent) ? args.clusterId : "");
    // let chapterId = args.chapterId && ((_.find(userProfile.defaultChapters, args.chapterId)) || userHierarchy.isParent) ? args.chapterId: "";
    // let subChapterId = args.subChapterId && ((_.find(userProfile.defaultSubChapters, args.subChapterId)) || userHierarchy.isParent) ? args.subChapterId: ""
  let chapterId = args.chapterId && ((_.findIndex(userProfile.defaultChapters, args.chapterId)) || userHierarchy.isParent) ? args.chapterId: "";
  let subChapterId = args.subChapterId && ((_.findIndex(userProfile.defaultSubChapters, args.subChapterId)) || userHierarchy.isParent) ? args.subChapterId: ""




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

    // let hierarchy = (levelCode && MlHierarchy.findOne({code:levelCode})) || "";
    let hierarchy = (levelCode &&  mlDBController.findOne('MlHierarchy', {code:levelCode}, context)) || "";
  // if(hierarchy != "" && (hierarchy.isParent || userHierarchy.hierarchyLevel <= hierarchy.hierarchyLevel)) {
    if(hierarchy != "" && (hierarchy.isParent || (userHierarchy.level >= hierarchy.level || userProfile.defaultCommunityHierarchyLevel >= hierarchy.level))) {
      doEdit = true;
    }

    if(doEdit)
    {
        // communityAccess = mlDBController.findOne('MlCommunityAccess', {"$and":[{"hierarchyCode":userHierarchy.code, "communityDefCode":args.communityId}]}, context);
      communityAccess = mlDBController.findOne('MlCommunityAccess', {"$and":[{"hierarchyCode":levelCode, clusterId:args.clusterId?args.clusterId:null, chapterId:args.chapterId?args.chapterId:null, subChapterId:args.subChapterId?args.subChapterId:null, "communityDefCode":args.communityId}]}, context);
      if(communityAccess){
            let isUpdate = false;

            if(communityAccess.aboutCommunity != args.community.aboutCommunity){
                isUpdate = true;
              // communityAccess.about = args.community.aboutCommunity
                communityAccess.aboutCommunity = args.community.aboutCommunity
            }

            if(communityAccess.isActive != args.community.isActive){
                isUpdate = true;
                communityAccess.isActive = args.community.isActive
            }

            if(communityAccess.showOnMap != args.community.showOnMap){
                isUpdate = true;
                communityAccess.showOnMap = args.community.showOnMap
            }

            if(communityAccess.displayName != args.community.displayName){
              isUpdate = true;
              communityAccess.displayName = args.community.displayName
            }

          if(isUpdate == true)
            resp = mlDBController.update('MlCommunityAccess', communityAccess._id, communityAccess, {$set:true}, context)
        }
        communitiesAccess = mlDBController.find('MlCommunityAccess', {"$and":[{communityDefCode:args.communityId, "isActive":true, "hierarchyCode":{"$ne":"PLATFORM"}}]}, context).fetch();
        if(communitiesAccess.length == 0){
            clusters = [{difference:[], isActive:false},{difference:args.clusters, isActive:true}] || []
            chapters = [{difference:[], isActive:false},{difference:args.chapters, isActive:true}] || [];
            subchapters = [{difference:[], isActive:false},{difference:args.subchapters , isActive:true}]|| [];
        }
        else{
          clusterids = clusterId == "" && _.map(_.filter(communitiesAccess, {hierarchyCode:"CLUSTER"}), "clusterId") || [];
          clusters = new MlRespPayload().getArrayDifference(clusterids, args.clusters)

          chapterids = chapterId == "" && _.map(_.filter(communitiesAccess, {hierarchyCode:"CHAPTER"}), "chapterId") || [];
          chapters = new MlRespPayload().getArrayDifference(chapterids, args.chapters)

          subchapterids = subChapterId == "" && _.map(_.filter(communitiesAccess, {hierarchyCode:"SUBCHAPTER"}), "subChapterId") || [];
          subchapters = new MlRespPayload().getArrayDifference(subchapterids, args.subchapters)
        }

        _.each(clusters, function (item) {
              _.each(item.difference, function (clusterid) {
                  resp = updateDB("MlCommunityAccess", {"$and":[{communityDefCode:args.communityId}, {clusterId:clusterid}, {"hierarchyCode":"CLUSTER"}]}, {isActive:item.isActive}, {$set:true}, context);
                  if(!resp){
                    updateDB("MlCommunityAccess", {communityDefCode:args.communityId, clusterId:clusterid, "hierarchyCode":"CLUSTER"}, {isActive:item.isActive}, {$set:true, upsert:true}, context);
                  }
              })
        })

        _.each(chapters, function (item) {
            _.each(item.difference, function (chapterid) {
                resp = updateDB("MlCommunityAccess", {"$and":[{communityDefCode:args.communityId}, {chapterId:chapterid}, {"hierarchyCode":"CHAPTER"}]}, {isActive:item.isActive}, {$set:true}, context);
                if(!resp){
                  updateDB("MlCommunityAccess", {communityDefCode:args.communityId, chapterId:chapterid, "hierarchyCode":"CHAPTER" }, {isActive:item.isActive}, {$set:true, upsert:true}, context);
                }
            })
        })

        _.each(subchapters, function (item) {
            _.each(item.difference, function (subchapterid) {
                resp = updateDB('MlCommunityAccess', {"$and":[{communityDefCode:args.communityId}, {subChapterId:subchapterid}, {"hierarchyCode":"SUBCHAPTER"}]}, {isActive:item.isActive}, {$set:true}, context)
                  if(!resp){
                    updateDB('MlCommunityAccess', {communityDefCode:args.communityId, subChapterId:subchapterid, "hierarchyCode":"SUBCHAPTER"}, {isActive:item.isActive}, {$set:true, upsert:true}, context)
                  }
                resp = updateDB('MlCommunity', {"$and":[{communityDefCode:args.communityId}, {subChapterId:subchapterid}, {"hierarchyCode":"SUBCHAPTER"}]}, {isActive:item.isActive}, {$set:true}, context)
                  if(!resp){
                    updateDB('MlCommunity', {communityDefCode:args.communityId, subChapterId:subchapterid, "hierarchyCode":"SUBCHAPTER"}, {isActive:item.isActive}, {$set:true, upsert:true}, context)
                  }
            })
        })

        if(resp)
            return new MlRespPayload().successPayload("Successfully updated", 200);

    }

    return new MlRespPayload().errorPayload("Failed to update community 5", 400);
}

MlResolver.MlQueryResolver['fetchCommunitiesSelect'] = (obj, args, context, info) =>
{
  // TODO : Authorization
  let query;
  let communities = [];
  if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != ""){
    query= {"$and":[{clusterId:args.clusterId, chapterId:args.chapterId, subChapterId:args.subChapterId, isActive:true}]};
  }
  let communitiesAccess = MlCommunityAccess.find(query).fetch();
  communitiesAccess.map(function (communityAccess) {
    let community = {};
    community["name"] = communityAccess.communityDefName;
    community["displayName"] = communityAccess.displayName;
    community["code"] = communityAccess.communityDefCode;
    communities.push(community);
  })
  return communities;
}

// MlResolver.MlMutationResolver['createCommunity'] = (obj, args, context, info) => {
//
// }

MlResolver.MlQueryResolver['fetchCommunitiesForRolesSelect'] = (obj, args, context, info) =>
{
  // TODO : Authorization
  let query;
  let communities = [];
  if(args.clusterId != "" && args.chapterId == "all" && args.subChapterId != "all" ){
    query= {"$and":[{clusterId:args.clusterId, subChapterId:args.subChapterId, isActive:true}]};
  }
  else if(args.clusterId != "" && args.chapterId != "all" && args.subChapterId == "all" ){
    query= {"$and":[{clusterId:args.clusterId, chapterId:args.chapterId, isActive:true}]};
  }
  else if(args.clusterId != "" && args.chapterId != "all" && args.subChapterId != "all" ){
    query= {"$and":[{clusterId:args.clusterId, chapterId:args.chapterId, subChapterId:args.subChapterId, isActive:true}]};
  }

  let communitiesAccess = MlCommunityAccess.find(query).fetch();
  communitiesAccess.map(function (communityAccess) {

    let community = {};
    community["name"] = communityAccess.communityDefName;
    community["code"] = communityAccess.communityDefCode;
    communities.push(community);
  })
  communities = _.uniqBy(communities, 'code')
  //added all for all levels irrespective of cluster,chapter,subchapter selection.
    let community = {};
    community["name"] = "All";
    community["code"] = "all";
    communities.push(community);

  return communities;
}

updateDB = (collectionName, query, payload, options, context) =>{
    return mlDBController.update(collectionName, query, payload, options, context)
}

