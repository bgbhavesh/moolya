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
      geocoder.geocode(chapter.displayName, Meteor.bindEnvironment(function (err, data) {
        if (err) {
          return "Invalid Country Name";
        }
        chapter.latitude = data.results[0].geometry.location.lat;
        chapter.longitude = data.results[0].geometry.location.lng;
        let id = MlChapters.insert(chapter);
        if (id) {
          let subChapter = {
            clusterId: chapter.clusterId,
            clusterName: chapter.clusterName,
            stateId: chapter.stateId,
            chapterId: id,
            chapterName: chapter.chapterName,
            subChapterCode: "ML_" + chapter.chapterName + "_" + subChapterName,
            subChapterName: subChapterName,
            subChapterDisplayName: subChapterName,
            associatedChapters: [],
            subChapterUrl: "",
            isUrlNotified: false,
            subChapterEmail: "moolyahyd@moolya.com",
            isEmailNotified: false,
            aboutSubChapter: "ssss",
            subChapterImageLink: "ssc",
            showOnMap: false,
            isActive: false,
            latitude:chapter.latitude,
            longitude:chapter.longitude,
            isBespokeRegistration: false,
            isBespokeWorkFlow: false,
            subChapterDataAcessMatrix: []
          }
          createSubChapter(subChapter);
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
    var id= args.id;
    let response= MlChapters.find({"clusterId":id}).fetch()||[];
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

MlResolver.MlQueryResolver['fetchSubChaptersSelectNonMoolya'] = (obj, args, context, info) => {
  let result=MlSubChapters.find({chapterId: args.id} && {subChapterName:{$ne:'Moolya'}}).fetch()||[];
  return result
}

MlResolver.MlMutationResolver['createSubChapter'] = (obj, args, context, info) => {
    createSubChapter(args.subChapter)
}

MlResolver.MlMutationResolver['updateSubChapter'] = (obj, args, context, info) => {
    let subChapter = MlSubChapters.findOne({_id: args.subChapterId});
    if(subChapter){
        for(key in args.subChapterDetails){
          subChapter[key] = args.subChapterDetails[key]
        }
        let resp = MlSubChapters.update({_id:args.subChapterId}, {$set:subChapter})
        if(resp){
            let code = 200;
            let result = {subChapter: resp}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
    }
}

createSubChapter = (subChapter) =>{
    if(MlSubChapters.find({$and:[{chapterId:subChapter.chapterId}, {subChapterName:subChapter.subChapterName}]}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }
    check(subChapter, Object)
    MlSubChapters.insert(subChapter);
}
