import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'

MlResolver.MlMutationResolver['createChapter'] = (obj, args, context, info) =>{
    let chapter = args.chapter;
    // let isValidAuth = new MlAuthorization().validteAuthorization(context.userId, args.moduleName, args.actionName);
    // if(!isValidAuth)
    //     return "Not Authorized"

    if(MlChapters.find({cityId:chapter.cityId}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }else{
        let id = MlChapters.insert(chapter);
        if(id){
            let code = 200;
            let result = {clusterid: id}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }

      // geocoder.geocode(cluster.displayName, Meteor.bindEnvironment(function ( err, data ) {
      //     if(err){
      //         return "Invalid Country Name";
      //     }
      //     cluster.latitude = data.results[0].geometry.location.lat;
      //     cluster.longitude = data.results[0].geometry.location.lng;
      // }));
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

}
