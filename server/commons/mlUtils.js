// /**
//  * Created by viswadeep on 26/4/17.
//  */
//
// module.exports = class MlRespPayload{
//     constructor(){
//     }
//
//     updateArrayofObjects(updateFor, source){
//         if(_.isArray(updateFor) && _.isArray(source)){
//             _.each(updateFor, function (obj) {
//                 let isObj = _.find(source, {index:obj.index})
//                 let itemIndex = _.findIndex(source, {index:obj.index})
//                 if(isObj &&  itemIndex >= 0){
//                     _.mergeWith(source[itemIndex], obj)
//                 }
//                 else{
//                   source.push(obj)
//                 }
//             })
//         }
//
//         return source;
//     }
//
// }
