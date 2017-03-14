import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import geocoder from 'geocoder'

MlResolver.MlMutationResolver['createChapter'] = (obj, args, context, info) =>{
    let chapter = args.chapter;
    let subChapterName = Meteor.settings.private.subChapterName;
    // let isValidAuth = new MlAuthorization().validteAuthorization(context.userId, args.moduleName, args.actionName);
    // if(!isValidAuth)
    //     return "Not Authorized"

    if(MlChapters.find({cityId:chapter.cityId}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }else {
      let geoCIty=chapter.cityName+", "+chapter.stateName?chapter.cityName+", "+chapter.stateName:"";
      geocoder.geocode(geoCIty, Meteor.bindEnvironment(function (err, data) {
        if (err) {
          return "Invalid Country Name";
        }
        chapter.latitude = data.results[0].geometry.location.lat;
        chapter.longitude = data.results[0].geometry.location.lng;
        let id = MlChapters.insert(chapter);
        if (id) {
          MlResolver.MlMutationResolver['createCommunityAccess'](obj, {clusterId:chapter.clusterId, chapterId: id, moduleName:"CHAPTER", actionName:"CREATE"}, context, info)
          let subChapter = {
            clusterId: chapter.clusterId,
            clusterName: chapter.clusterName,
            stateId: chapter.stateId,
            chapterId: id,
            chapterName: chapter.chapterName,
            subChapterCode: "ML_" + chapter.chapterName + "_" + subChapterName,
            subChapterName: subChapterName+"-"+chapter.chapterName,
            subChapterDisplayName: subChapterName,
            associatedChapters: [],
            subChapterUrl: "",
            isUrlNotified: false,
            subChapterEmail: "moolyahyd@moolya.com",
            isEmailNotified: false,
            aboutSubChapter: "",
            subChapterImageLink: "ssc",
            showOnMap: false,
            isActive: false,
            latitude:chapter.latitude,
            longitude:chapter.longitude,
            isBespokeRegistration: false,
            isBespokeWorkFlow: false,
            isDefaultSubChapter:true,
            subChapterDataAcessMatrix: []
          }
          let subchapterid = createSubChapter(subChapter);
          if(subchapterid){
              MlResolver.MlMutationResolver['createCommunityAccess'](obj, {clusterId:subChapter.clusterId, chapterId:subChapter.chapterId, subChapterId:subchapterid, moduleName:"COMMUNITY", actionName:"CREATE"}, context, info)
              MlResolver.MlMutationResolver['createCommunity'](obj, {clusterId:subChapter.clusterId, clusterName:subChapter.clusterName, chapterId:subChapter.chapterId, chapterName:subChapter.chapterName, subChapterId:subchapterid, subChapterName:subChapter.subChapterName, moduleName:"COMMUNITY", actionName:"CREATE"}, context, info)
          }
          let code = 200;
          let result = {chapterId: id}
          let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
          return response
        }
      }));
    }
}

MlResolver.MlMutationResolver['updateChapter'] = (obj, args, context, info) => {
    console.log(args)
    let chapter = MlChapters.findOne({_id: args.chapterId});
    if(chapter){
        for(key in args.chapter){
          chapter[key] = args.chapter[key]
        }
        if(chapter.isActive){
          if(chapter.status && chapter.status.code != 101){
            chapter.status= {
              code: 101,
              description :"Work In Progress"
            }
          }
        }else{
          if(chapter.status && chapter.status.code != 110){
            chapter.status= {
              code: 110,
              description :"Inactive"
            }
          }
        }
        let resp = MlChapters.update({_id:args.chapterId}, {$set:chapter}, {upsert:true})
        if(resp){
          let code = 200;
          let result = {chapter: resp}
          let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
          return response
        }
    }
}

MlResolver.MlQueryResolver['fetchChapter'] = (obj, args, context, info) => {

}

MlResolver.MlQueryResolver['fetchChapters'] = (obj, args, context, info) => {
  if (args.id) {
    let id= args.id;
    let response = [];
    if(id == "all"){
      response= MlChapters.find({}).fetch()||[];
      response.push({"chapterName" : "All","_id" : "all"});
    }else{
      response= MlChapters.find({"clusterId":id}).fetch()||[];
      if(response.length > 0){
        response.push({"chapterName" : "All","_id" : "all"});
      }
    }

    return response;
  }
}

MlResolver.MlQueryResolver['fetchChaptersForMap'] = (obj, args, context, info) => {
  let result=MlChapters.find({isActive:true}).fetch()||[];
  return result;
}

MlResolver.MlQueryResolver['fetchSubChapter'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args._id) {
    var id= args._id;
    let response= MlSubChapters.findOne({"_id":id});
    return response;
  }
}

MlResolver.MlQueryResolver['fetchSubChapters'] = (obj, args, context, info) => {
  let result =  MlSubChapters.find({chapterId: args.id}).fetch()||[];
  return {data:result};
}

MlResolver.MlQueryResolver['fetchSubChaptersSelect'] = (obj, args, context, info) => {
  let result=MlSubChapters.find({chapterId: args.id}).fetch()||[];
  return result
}

MlResolver.MlQueryResolver['fetchSubChaptersSelectNonMoolya'] = (obj, args, context, info) =>
{
    let id = args.id || "";
    let result = [];
    if(args.id == "all"){
        result=MlSubChapters.find({} && {subChapterName:{$ne:'Moolya'},isActive: true}).fetch()||[];
        result.push({"subChapterName" : "All","_id" : "all"});
    }else{
         result=MlSubChapters.find({chapterId: args.id} && {subChapterName:{$ne:'Moolya'},isActive: true}).fetch()||[];
        if(result.length > 0){
             result.push({"subChapterName" : "All","_id" : "all"});
        }
    }

    return result
}

MlResolver.MlQueryResolver['fetchActiveSubChapters'] = (obj, args, context, info) => {
  let result=MlSubChapters.find({isActive: true,subChapterName:{$ne:"Moolya"}}).fetch()||[];
  return result
}

MlResolver.MlMutationResolver['createSubChapter'] = (obj, args, context, info) => {
    createSubChapter(args.subChapter)
}

MlResolver.MlMutationResolver['updateSubChapter'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args.subChapterDetails);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

    let subChapter = MlSubChapters.findOne({_id: args.subChapterId});
    if(subChapter){
        for(key in args.subChapterDetails){
          subChapter[key] = args.subChapterDetails[key]
        }
        let resp = MlSubChapters.update({_id:args.subChapterId}, {$set:subChapter})
        if(resp){
          if((subChapter.subChapterName == "Moolya") && args.subChapterDetails.chapterId){
            MlResolver.MlMutationResolver['updateChapter'] (obj, {chapterId:args.subChapterDetails.chapterId, chapter:{isActive:subChapter.isActive}}, context, info)
          }
            let code = 200;
            let result = {subChapter: resp}
            let response = new MlRespPayload().successPayload(result, code);
            return response
        }
    }
}

MlResolver.MlQueryResolver['fetchActiveClusterChapters'] = (obj, args, context, info) => {
    let clusters = args.clusters;
    let chapters = [];
    if(clusters && clusters.length > 0){
        clusters.map(function (clusterId) {
              activeChapters = MlChapters.find({"$and":[{clusterId:clusterId, isActive:true}]}).fetch();
              if(activeChapters && activeChapters.length > 0){
                  chapters = chapters.concat(activeChapters)
              }
        })
    }

    return chapters;
}

MlResolver.MlQueryResolver['fetchActiveChaptersSubChapters'] = (obj, args, context, info) => {
  let chapters = args.chapters;
  let subChapters = [];
  if(chapters && chapters.length > 0){
    chapters.map(function (chapterId) {
      activeSubChapters = MlSubChapters.find({"$and":[{chapterId:chapterId, isActive:true}]}).fetch();
      if(activeSubChapters && activeSubChapters.length > 0){
        subChapters = subChapters.concat(activeSubChapters)
      }
    })
  }

  return subChapters;
}

createSubChapter = (subChapter) =>{
    if(MlSubChapters.find({$and:[{chapterId:subChapter.chapterId}, {subChapterName:subChapter.subChapterName}]}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }
    check(subChapter, Object)
    let id = MlSubChapters.insert(subChapter);
    return id
}
