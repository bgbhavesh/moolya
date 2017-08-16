import MlResolver from "../../../commons/mlResolverDef";
import MlRespPayload from "../../../commons/mlPayload";
import geocoder from "geocoder";
import MlAdminUserContext from "../../../../server/mlAuthorization/mlAdminUserContext";
import MlEmailNotification from "../../../mlNotifications/mlEmailNotifications/mlEMailNotification";
import {GenerateUniqueCode} from '../../../commons/utils'
import _ from 'lodash'

MlResolver.MlMutationResolver['createChapter'] = (obj, args, context, info) => {
  let chapter = args.chapter;
  let subChapterName = Meteor.settings.private.subChapterName;
  // let isValidAuth = new MlAuthorization().validteAuthorization(context.userId, args.moduleName, args.actionName);
  // if(!isValidAuth)
  //     return "Not Authorized"

  // if(MlChapters.find({cityId:chapter.cityId}).count() > 0){
  if (mlDBController.find('MlChapters', {cityId: chapter.cityId}, context).count() > 0) {
    let code = 409;
    return new MlRespPayload().errorPayload("Already Exist", code);
  } else {
    let geoCIty = chapter.cityName + ", " + chapter.stateName + ", " + chapter.clusterName ? chapter.cityName + ", " + chapter.stateName + ", " + chapter.clusterName : "";
    geocoder.geocode(geoCIty, Meteor.bindEnvironment(function (err, data) {
      if (err) {
        return "Invalid Country Name";
      }
      chapter.latitude = data.results[0].geometry.location.lat;
      chapter.longitude = data.results[0].geometry.location.lng;
      // let id = MlChapters.insert(chapter);
      let id = mlDBController.insert('MlChapters', chapter, context)
      if (id) {
        MlResolver.MlMutationResolver['createCommunityAccess'](obj, {
          clusterId: chapter.clusterId,
          chapterId: id,
          moduleName: "CHAPTER",
          actionName: "CREATE"
        }, context, info)
        let subChapter = {
          clusterId: chapter.clusterId,
          clusterName: chapter.clusterName,
          stateId: chapter.stateId,
          chapterId: id,
          chapterName: chapter.chapterName,
          subChapterCode: "ML_" + chapter.chapterName + "_" + subChapterName,
          subChapterName: subChapterName + "-" + chapter.chapterName,
          subChapterDisplayName: subChapterName,
          // associatedChapters: [],
          subChapterUrl: "",
          isUrlNotified: false,
          subChapterEmail: "",
          isEmailNotified: false,
          aboutSubChapter: "",
          subChapterImageLink: "",
          showOnMap: false,
          isActive: false,
          latitude: chapter.latitude,
          longitude: chapter.longitude,
          isBespokeRegistration: false,
          isBespokeWorkFlow: false,
          isDefaultSubChapter: true
        }
        let subchapterid = createSubChapter(subChapter, context);
        if (subchapterid) {
          MlResolver.MlMutationResolver['createCommunityAccess'](obj, {
            clusterId: subChapter.clusterId,
            chapterId: subChapter.chapterId,
            subChapterId: subchapterid,
            moduleName: "COMMUNITY",
            actionName: "CREATE"
          }, context, info)
          MlResolver.MlMutationResolver['createCommunity'](obj, {
            clusterId: subChapter.clusterId,
            clusterName: subChapter.clusterName,
            chapterId: subChapter.chapterId,
            chapterName: subChapter.chapterName,
            subChapterId: subchapterid,
            subChapterName: subChapter.subChapterName,
            moduleName: "COMMUNITY",
            actionName: "CREATE"
          }, context, info)
        }
        let code = 200;
        let result = {chapterId: id}
        let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
        return response
      }
    }), {key: Meteor.settings.private.googleApiKey});
  }
}

MlResolver.MlMutationResolver['updateChapter'] = (obj, args, context, info) => {
  // let chapter = MlChapters.findOne({_id: args.chapterId});
  let chapter = mlDBController.findOne('MlChapters', {_id: args.chapterId}, context)
  if (chapter) {
    for (key in args.chapter) {
      chapter[key] = args.chapter[key]
    }
    if (chapter.isActive && chapter.showOnMap) {
      if (chapter.status && chapter.status.code != 111) {
        chapter.status = {
          code: 111,
          description: "Active"
        }
      }
    } else if (chapter.isActive) {
      if (chapter.status && chapter.status.code != 101) {
        chapter.status = {
          code: 101,
          description: "Work In Progress"
        }
      }
    } else {
      if (chapter.status && chapter.status.code != 110) {
        chapter.status = {
          code: 110,
          description: "Inactive"
        }
      }
    }
    // let resp = MlChapters.update({_id:args.chapterId}, {$set:chapter}, {upsert:true})
    let resp = mlDBController.update('MlChapters', args.chapterId, chapter, {$set: true}, context)
    if (resp) {
      let code = 200;
      let result = {chapter: resp}
      let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
      return response
    }
  }
}

MlResolver.MlQueryResolver['fetchChapter'] = (obj, args, context, info) => {
  var response = mlDBController.findOne('MlChapters', {_id: args.chapterId}, context) || []
  return response
}

MlResolver.MlQueryResolver['fetchChaptersWithoutAll'] = (obj, args, context, info) => {
  if (args.id) {
    let id = args.id;
    let response = [];
    // response = MlChapters.find({"clusterId":id, "isActive":true}).fetch()||[];
    response = mlDBController.find('MlChapters', {"clusterId": id, "isActive": true}, context).fetch() || [];
    return response;
  }
}
MlResolver.MlQueryResolver['fetchChapters'] = (obj, args, context, info) => {
  if (args.id) {
    let id = args.id;
    let response = [];
    if (id == "all") {
      response = mlDBController.find('MlChapters', {isActive: true}, context).fetch() || [];
      response.push({"chapterName": "All", "_id": "all"});
    } else {
      response = mlDBController.find('MlChapters', {"clusterId": id, "isActive": true}, context).fetch() || [];
      if (response.length > 0) {
        response.push({"chapterName": "All", "_id": "all"});
      }
    }
    return response;
  }
}

MlResolver.MlQueryResolver['fetchChaptersForMap'] = (obj, args, context, info) => {
  let result = mlDBController.find('MlChapters', {isActive: true}, context).fetch() || [];
  return result;
}

/**
 * @module Subchapter
 * @params "subChapterId"
 * @Note: if Non-moolya get related also
 * */
MlResolver.MlQueryResolver['fetchSubChapter'] = (obj, args, context, info) => {
  var response = {}
  if (args.subChapterId) {
    var id = args.subChapterId;
    response = mlDBController.findOne('MlSubChapters', {"_id": id}, context) || {}
    let stateName = mlDBController.findOne('MlStates', {_id: response.stateId}, context).name;
    response.stateName = stateName;
    if (response && !response.isDefaultSubChapter) {
      let associatedObj = MlResolver.MlQueryResolver['fetchRelatedSubChapters'](obj, {subChapterId: args.subChapterId}, context, info)
      if (associatedObj)
        response.associatedObj = associatedObj
    }
    return response;
  } else
    return response
}

MlResolver.MlQueryResolver['fetchSubChapters'] = (obj, args, context, info) => {
  // let result =  MlSubChapters.find({chapterId: args.id}).fetch()||[];
  let result = mlDBController.find('MlSubChapters', {chapterId: args.chapterId}, context).fetch() || [];
  return {data: result};
}

MlResolver.MlQueryResolver['fetchSubChaptersSelect'] = (obj, args, context, info) => {
  let chapterId = args.id;
  if (args.id && args.id === 'all') {
  }
  let result = mlDBController.find('MlSubChapters', {chapterId: chapterId}, context).fetch() || [];
  if (args && args.displayAllOption && args.id && args.id.trim() !== "") {
    result.push({"subChapterName": "All", "_id": "all"});
  }
  return result
}

MlResolver.MlQueryResolver['fetchSubChaptersSelectNonMoolya'] = (obj, args, context, info) => {
  let id = args.chapterId || "";
  let result = [];
  if (args.chapterId == "all") {
    if (args.clusterId == "all") {
      result = mlDBController.find('MlSubChapters', {
          isDefaultSubChapter: false,
          isActive: true
        }, context).fetch() || [];
      result.push({"subChapterName": "All", "_id": "all"});
    } else {
      result = mlDBController.find('MlSubChapters', {
          clusterId: args.clusterId,
          isDefaultSubChapter: false,
          isActive: true
        }, context).fetch() || [];
      result.push({"subChapterName": "All", "_id": "all"});
    }
  } else {
    // result = mlDBController.find('MlSubChapters', {"$and": [{chapterId: args.chapterId,isDefaultSubChapter:false,isActive: true}]}, context).fetch()||[];
    var query = args.chapterId ? {
      chapterId: args.chapterId,
      isDefaultSubChapter: false,
      isActive: true
    } : {'$and': [{isDefaultSubChapter: false, isActive: true}, {'_id': {$ne: args.subChapterId}}]}
    result = mlDBController.find('MlSubChapters', query, context).fetch() || [];
    if (result.length > 0 && args.chapterId) {
      result.push({"subChapterName": "All", "_id": "all"});
    }
  }
  return result
}

//roles Moolya subChapter
MlResolver.MlQueryResolver['fetchSubChaptersSelectMoolya'] = (obj, args, context, info) => {
  let chapterId = args.chapterId || "";
  let result = [];
  if (args.chapterId == "all") {
    if (args.clusterId == "all") {
      result = mlDBController.find('MlSubChapters', {isDefaultSubChapter: true, isActive: true}, context).fetch() || [];
      result.push({"subChapterName": "All", "_id": "all"});
    } else {
      result = mlDBController.find('MlSubChapters', {
          clusterId: args.clusterId,
          isDefaultSubChapter: true,
          isActive: true
        }, context).fetch() || [];
      result.push({"subChapterName": "All", "_id": "all"});
    }
    /*  result = mlDBController.find('MlSubChapters', {clusterId:args.clusterId,isDefaultSubChapter:true,isActive: true}, context).fetch()||[];
     console.log(result);
     result.push({"subChapterName" : "All","_id" : "all"});*/
  } else {
    result = mlDBController.find('MlSubChapters', {
        "$and": [{
          chapterId: args.chapterId,
          isDefaultSubChapter: true,
          isActive: true
        }]
      }, context).fetch() || [];
    if (result.length > 0) {
      result.push({"subChapterName": "All", "_id": "all"});
    }
  }
  return result
}


MlResolver.MlQueryResolver['fetchActiveSubChapters'] = (obj, args, context, info) => {
  // let result=MlSubChapters.find({isActive: true,isDefaultSubChapter:false}).fetch()||[];
  var curUserProfile = new MlAdminUserContext().userProfileDetails(context.userId);
  var queryChange;
  if (curUserProfile.defaultSubChapters.indexOf("all") < 0) {   //sub-chapter_admin non-moolya
    queryChange = {
      $and: [{
        isActive: true,
        isDefaultSubChapter: false
      }, {
        '_id': {
          $in: curUserProfile.defaultSubChapters
        }
      }]
    }
  } else {
    queryChange = {isActive: true, isDefaultSubChapter: false}   //platform_admin
  }
  let result = mlDBController.find('MlSubChapters', queryChange, context).fetch() || [];
  return result
}

MlResolver.MlMutationResolver['createSubChapter'] = (obj, args, context, info) => {
  try {
    args.subChapter.isDefaultSubChapter = false;
    let subChapterId = createSubChapter(args.subChapter, context)

    if (subChapterId) {
      if (args.subChapter && args.subChapter.associatedObj && args.subChapter.associatedObj.length) {
        _.each(args.subChapter.associatedObj, function (item, say) {
          item.subChapters.push({subChapterId: subChapterId, chapterId: args.chapterId})
        })
        MlResolver.MlMutationResolver['createRelatedSubChapters'](obj, {associatedObj: args.subChapter.associatedObj}, context, info)
      }


      MlResolver.MlMutationResolver['createCommunityAccess'](obj, {
        clusterId: args.subChapter.clusterId,
        chapterId: args.subChapter.chapterId,
        subChapterId: subChapterId,
        moduleName: "COMMUNITY",
        actionName: "CREATE"
      }, context, info)

      MlResolver.MlMutationResolver['createCommunity'](obj, {
        clusterId: args.subChapter.clusterId,
        clusterName: args.subChapter.clusterName,
        chapterId: args.subChapter.chapterId,
        chapterName: args.subChapter.chapterName,
        subChapterId: subChapterId,
        subChapterName: args.subChapter.subChapterName,
        moduleName: "COMMUNITY",
        actionName: "CREATE"
      }, context, info)

      let geoCIty = args.subChapter.chapterName + ", " + args.subChapter.stateName + ", " + args.subChapter.clusterName ? args.subChapter.chapterName + ", " + args.subChapter.stateName + ", " + args.subChapter.clusterName : "";

      geocoder.geocode(geoCIty, Meteor.bindEnvironment(function (err, data) {
        if (err) {
          console.log('Error while creating sub-chapter')
          return "Invalid Country Name";
        }
        let subChapter = MlSubChapters.findOne({"_id": subChapterId})
        if (subChapter) {
          var latitude = data.results[0].geometry.location.lat;
          var longitude = data.results[0].geometry.location.lng;
          mlDBController.update('MlSubChapters', subChapterId, {
            latitude: latitude,
            longitude: longitude
          }, {$set: true}, context)
        }
      }));

      let code = 200;
      let response = new MlRespPayload().successPayload(subChapterId, code);
      return response
    }
    else {
      let code = 400;
      let response = new MlRespPayload().errorPayload("Unable To Create Subchapter", code);
      return response
    }
  } catch (e) {
    let code = 400;
    let response = new MlRespPayload().errorPayload(e.message, code);
    return response
  }
}


MlResolver.MlMutationResolver['updateSubChapter'] = (obj, args, context, info) => {
  let subChapter = mlDBController.findOne('MlSubChapters', {_id: args.subChapterId}, context)
  if (subChapter) {
    for (key in args.subChapterDetails) {
      subChapter[key] = args.subChapterDetails[key]
    }
    let resp = mlDBController.update('MlSubChapters', args.subChapterId, subChapter, {$set: true}, context)
    if (resp) {
      if (subChapter && args.subChapterId && subChapter.isEmailNotified) {
        MlEmailNotification.chapterVerficationEmail(args.subChapterId, context);
      }
      if (!subChapter.isDefaultSubChapter) {
        MlResolver.MlMutationResolver['updateRelatedSubChapters'](obj, {associatedObj: args.subChapterDetails.associatedObj}, context, info)
      }
    }

    if (resp) {
      if (subChapter && subChapter.chapterId && subChapter.isDefaultSubChapter === true) {   //if(args.subChapterDetails && args.subChapterDetails.chapterId){
        MlResolver.MlMutationResolver['updateChapter'](obj, {
          chapterId: subChapter.chapterId,
          chapter: {isActive: subChapter.isActive, showOnMap: subChapter.showOnMap}
        }, context, info)
        // MlResolver.MlMutationResolver['updateChapter'] (obj, {chapterId:args.subChapterDetails.chapterId, chapter:{isActive:subChapter.isActive, showOnMap:subChapter.showOnMap}}, context, info)
      }
      let code = 200;
      let result = {subChapter: resp}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }

    // if(resp){
    // let subChapters = mlDBController.find('MlSubChapters', {chapterId:subChapter.chapterId}, context).fetch()
    // let status,activeCount=0,addCount=0,inactiveCount=0,inactiveCounts=0
    // if(subChapters){
    //   subChapters.map(function (subchapter) {
    //     if(subchapter.isActive && subchapter.showOnMap){
    //       status = "active";
    //       activeCount++
    //     } else if(subchapter.isActive && !subchapter.showOnMap){
    //       status = "add";
    //       addCount++
    //     } else if(!subchapter.isActive && subchapter.showOnMap){
    //       status = "inactive";
    //       inactiveCount++
    //     } else if(!subchapter.isActive && !subchapter.showOnMap){
    //       status = "inactive";
    //       inactiveCounts++
    //     }
    //   })
    //   if(subChapters.length == activeCount){
    //     MlResolver.MlMutationResolver['updateChapter'] (obj, {chapterId:subChapter.chapterId, chapter:{isActive:true, showOnMap:true}}, context, info)
    //     let code = 200;
    //     let result = {subChapter: resp}
    //     let response = new MlRespPayload().successPayload(result, code);
    //     return response
    //   }else if(subChapters.length == addCount){
    //     MlResolver.MlMutationResolver['updateChapter'] (obj, {chapterId:subChapter.chapterId, chapter:{isActive:true, showOnMap:false}}, context, info)
    //     let code = 200;
    //     let result = {subChapter: resp}
    //     let response = new MlRespPayload().successPayload(result, code);
    //     return response
    //   }else if(subChapters.length == inactiveCount){
    //     MlResolver.MlMutationResolver['updateChapter'] (obj, {chapterId:subChapter.chapterId, chapter:{isActive:false, showOnMap:true}}, context, info)
    //     let code = 200;
    //     let result = {subChapter: resp}
    //     let response = new MlRespPayload().successPayload(result, code);
    //     return response
    //   }else if(subChapters.length == inactiveCounts){
    //     MlResolver.MlMutationResolver['updateChapter'] (obj, {chapterId:subChapter.chapterId, chapter:{isActive:false, showOnMap:false}}, context, info)
    //     let code = 200;
    //     let result = {subChapter: resp}
    //     let response = new MlRespPayload().successPayload(result, code);
    //     return response
    //   }
    // }

    /* if(subChapter && subChapter.chapterId){   //if(args.subChapterDetails && args.subChapterDetails.chapterId){
     MlResolver.MlMutationResolver['updateChapter'] (obj, {chapterId:subChapter.chapterId, chapter:{isActive:subChapter.isActive, showOnMap:subChapter.showOnMap}}, context, info)
     // MlResolver.MlMutationResolver['updateChapter'] (obj, {chapterId:args.subChapterDetails.chapterId, chapter:{isActive:subChapter.isActive, showOnMap:subChapter.showOnMap}}, context, info)
     }*/

    // }
  }
}

MlResolver.MlQueryResolver['fetchActiveClusterChapters'] = (obj, args, context, info) => {
  let clusters = args.clusters;
  let chapters = [];
  if (clusters && clusters.length > 0) {
    if (clusters.length == 1 && clusters[0] == "all") {
      // chapters= MlChapters.find({isActive:true}).fetch()||[];
      chapters = mlDBController.find('MlChapters', {isActive: true}, context).fetch() || [];
      if (args && args.displayAllOption && chapters.length >= 1) {
        chapters.push({"chapterName": "All", "_id": "all"});
      }

    } else {
      clusters.map(function (clusterId) {
        // activeChapters = MlChapters.find({"$and": [{clusterId: clusterId, isActive: true}]}).fetch();
        activeChapters = mlDBController.find('MlChapters', {
          "$and": [{
            clusterId: clusterId,
            isActive: true
          }]
        }, context).fetch();
        if (activeChapters && activeChapters.length > 0) {
          chapters = chapters.concat(activeChapters)
        }
      })

      if (args && args.displayAllOption && chapters.length >= 1) {
        //if(chapters.length>=1){
        chapters.push({"chapterName": "All", "_id": "all"});
      }
    }
  }

  return chapters;
}
MlResolver.MlQueryResolver['fetchActiveStatesChapters'] = (obj, args, context, info) => {
  let states = args.states;
  let clusters = args.clusters;
  let chapters = [];
  if (states && states.length > 0) {
    if (states.length == 1 && states[0] == "all" && clusters[0] == "all") {
      chapters = MlChapters.find({isActive: true}).fetch() || [];
      if (chapters.length >= 1) {
        chapters.push({"chapterName": "All", "_id": "all"});
      }
    } else if (states.length == 1 && states[0] == "all" && clusters[0] != "all") {
      clusters.map(function (clusterId) {
        activeChapters = MlChapters.find({"$and": [{clusterId: clusterId, isActive: true}]}).fetch();
        if (activeChapters && activeChapters.length > 0) {
          chapters = chapters.concat(activeChapters)
        }
      })
      if (chapters.length >= 1) {
        chapters.push({"chapterName": "All", "_id": "all"});
      }
    } else {
      states.map(function (stateId) {
        activeChapters = MlChapters.find({"$and": [{stateId: stateId, isActive: true}]}).fetch();
        if (activeChapters && activeChapters.length > 0) {
          chapters = chapters.concat(activeChapters)
        }
      })
      if (chapters.length >= 1) {
        chapters.push({"chapterName": "All", "_id": "all"});
      }

    }
  }


  return chapters;
}


MlResolver.MlQueryResolver['fetchActiveChaptersSubChapters'] = (obj, args, context, info) => {
  let chapters = args.chapters;
  let clusters = args.clusters;
  let subChapters = [];
  if (chapters && chapters.length > 0) {
    if (chapters.length == 1 && chapters[0] == "all" && clusters[0] == "all") {
      // subChapters= MlSubChapters.find({isActive:true}).fetch()||[];
      subChapters = mlDBController.find('MlSubChapters', {isActive: true}, context).fetch() || [];
      subChapters.push({"subChapterName": "All", "_id": "all"});
    }
    else if (chapters.length == 1 && chapters[0] == "all" && clusters[0] != "all") {
      clusters.map(function (clusterId) {
        // activeSubChapters = MlSubChapters.find({"$and": [{chapterId: chapterId, isActive: true}]}).fetch();
        activeSubChapters = mlDBController.find('MlSubChapters', {
          "$and": [{
            clusterId: clusterId,
            isActive: true
          }]
        }, context).fetch();
        if (activeSubChapters && activeSubChapters.length > 0) {
          subChapters = subChapters.concat(activeSubChapters)
        }
      })
      if (args && args.displayAllOption && subChapters.length >= 1) {
        subChapters.push({"subChapterName": "All", "_id": "all"});
      }
    }
    else {
      chapters.map(function (chapterId) {
        // activeSubChapters = MlSubChapters.find({"$and": [{chapterId: chapterId, isActive: true}]}).fetch();
        activeSubChapters = mlDBController.find('MlSubChapters', {
          "$and": [{
            chapterId: chapterId,
            isActive: true
          }]
        }, context).fetch();
        if (activeSubChapters && activeSubChapters.length > 0) {
          subChapters = subChapters.concat(activeSubChapters)
        }
      })
      if (args && args.displayAllOption && subChapters.length >= 1) {
        subChapters.push({"subChapterName": "All", "_id": "all"});
      }

    }
  }

  return subChapters;
}

MlResolver.MlQueryResolver['fetchSubChaptersForRegistration'] = (obj, args, context, info) => {
  let id = args.id || "";
  let result = [];
  if (id) {
    if (id == "all") {
      // result=MlSubChapters.find({chapterId:id}).fetch()||[];
      result = mlDBController.find('MlSubChapters', {chapterId: id}, context).fetch() || [];
      result.push({"subChapterName": "All", "_id": "all"});
    } else {
      // result=MlSubChapters.find({chapterId:id}).fetch()||[];
      result = mlDBController.find('MlSubChapters', {chapterId: id}, context).fetch() || [];
      if (result.length > 0) {
        result.push({"subChapterName": "All", "_id": "all"});
      }
    }
  }
  return result
}

createSubChapter = (subChapter, context) => {
  if (mlDBController.find('MlSubChapters', {$and: [{chapterId: subChapter.chapterId}, {subChapterName: subChapter.subChapterName}]}, context).count() > 0) {
    let code = 409;
    return new MlRespPayload().errorPayload("Already Exist", code);
  }
  check(subChapter, Object)
  let id = mlDBController.insert('MlSubChapters', subChapter, context)
  return id
}

/******************************************** start related subChapter resolvers********************************************/

MlResolver.MlMutationResolver['createRelatedSubChapters'] = (obj, args, context, info) => {
  var response = null
  if (args.associatedObj) {
    _.each(args.associatedObj, function (item, say) {
      var generatedCode = GenerateUniqueCode(item.subChapters[0].subChapterId, item.subChapters[1].subChapterId)
      item.relatedCode = generatedCode
      response = mlDBController.insert('MlRelatedSubChapters', item, context)
    })
    let code = 200;
    response = new MlRespPayload().successPayload('Related subchapter successfully created', code);
    return response
  } else {
    let code = 400;
    response = new MlRespPayload().errorPayload('Required fields not available', code);
    return response
  }
}

MlResolver.MlQueryResolver['fetchRelatedSubChapters'] = (obj, args, context, info) => {
  var matchSubChapters = []
  if (args.subChapterId) {
    matchSubChapters = mlDBController.find('MlRelatedSubChapters', {subChapters: {$elemMatch: {subChapterId: args.subChapterId}}}).fetch() || []
    _.each(matchSubChapters, function (item, say) {
      _.remove(item.subChapters, {subChapterId: args.subChapterId})
    })
  }
  return matchSubChapters
}

MlResolver.MlMutationResolver['updateRelatedSubChapters'] = (obj, args, context, info) => {
  var response = ""
  try {
    if (args.associatedObj) {
      _.each(args.associatedObj, function (item, say) {
        var generatedCode = GenerateUniqueCode(item.subChapters[0].subChapterId, item.subChapters[1].subChapterId)
        var obj = {
          backendUser: item.backendUser,
          externalUser: item.externalUser,
          isActive: item.isActive,
          relatedCode:generatedCode
        }
        let isValue = mlDBController.findOne('MlRelatedSubChapters', {relatedCode: generatedCode}, context)
        if(isValue){
          response = mlDBController.update('MlRelatedSubChapters', {relatedCode: generatedCode}, obj, {$set: true}, context)
        }else{
          item.relatedCode = generatedCode
          response = mlDBController.insert('MlRelatedSubChapters', item, context)
        }
      })
      if (response) {
        let code = 200;
        response = new MlRespPayload().successPayload('Related subChapters updated successful', code);
        return response
      }
    } else {
      let code = 400;
      response = new MlRespPayload().errorPayload('Required fields not available', code);
      return response
    }
  }
  catch (e) {
    let code = 400;
    response = new MlRespPayload().errorPayload(e.message, code);
    return response
  }
}

/******************************************** end related subChapter resolvers ********************************************/
