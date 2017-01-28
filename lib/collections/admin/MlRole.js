// /**
//  * Created by venkatasrinag on 25/1/17.
//  */
// MlRoles = new Mongo.Collection('mlRoles');
//
// MlRoleSchema = new SimpleSchema({
//     roleName:{
//         type:String,
//         optional:false
//     },
//
//     displayName:{
//         type:String,
//         optional:false
//     },
//
//     roletype : {
//         type:String,
//         optional:false
//     },
//
//     description :{
//         type:String,
//         optional:false
//     },
//
//     // departments : {
//     //     type:Array,
//     //     optional:false
//     // },
//     //
//     permissions :{
//         type:Array,
//         optional:true
//     },
//
//     'permissions.$':{
//         type:Object,
//         optional:true
//     },
//
//     'permission.$.permissionId':{
//         type:String,
//         optional:true
//     },
//
//     'permission.$.validFrom':{
//         type:Date,
//         optional:true
//     },
//
//     'permission.$.validTo':{
//         type:Date,
//         optional:true
//     },
//
//     isActive :{
//         type:Boolean,
//         optional:false
//     }
// })
//
// MlRoles.attachSchema(MlRoleSchema);
