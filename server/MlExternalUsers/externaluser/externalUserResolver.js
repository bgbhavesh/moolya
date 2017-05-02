// /**
//  * Created by venkatsrinag on 28/4/17.
//  */
// import MlResolver from '../../commons/mlResolverDef'
// import MlRespPayload from '../../commons/mlPayload'
//
// MlResolver.MlQueryResolver['fetchIdeatorUsers'] = (obj, args, context, info) =>
// {
//     let sample = [
//         {
//             username:"",
//             profile:{
//                 isExternaluser:true,
//                 city:"",
//                 state:"",
//                 country:"",
//                 cluster:"",
//                 chapter:"",
//                 community:"",
//                 externalUserProfile:{
//                     firstName:"",
//                     lastName:"",
//                     userProfiles:[
//                         {
//                             registrationId:"",
//                             portfolio:[
//                                 {
//                                     portfolioId:"",
//                                     isDefault:true
//                                 }
//                             ],
//                             countryName:"",
//                             countryId:"",
//                             cityName:"",
//                             mobileNumber:"",
//                             clusterId:"",
//                             clusterName:"",
//                             chapterId:"",
//                             chapterName:"",
//                             subChapterId:"",
//                             subChapterName:"",
//                             communityId:"",
//                             communityName:"",
//                             communityType:"",
//                             isDefault:true,
//                             isActive:true,
//                             accountType:""
//                         }
//                     ]
//                 }
//             }
//         }
//     ]
//   let code = 200;
//   let response = new MlRespPayload().successPayload(sample, code);
//   return response;
// }
