import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
// let CommunitySchema = `
//
//     type clustersOutput{
//         id:String
//     }
//      type chaptersOutput{
//         id:String
//     }
//
//     type Community
//     {
//         communityName :String,
//         communityDisplayName :String,
//         link : String,
//         id:String,
//         showOnMap : Boolean,
//         communityDescription : String,
//         isActive : Boolean
//     }
//     type CommunityDef{
//         name :String
//         displayName :String
//         communityImageLink: String
//         code: String
//         aboutCommunity : String
//         clusters: [clustersOutput]
//         chapters: [chaptersOutput]
//         _id:String
//         showOnMap : Boolean
//         isActive : Boolean
//     }
//     type CommunityDefOutput{
//       data:[CommunityDef]
//     }
//

//   input clusters{
//       id   :  String
//   }
//   input chapters{
//       id   :  String
//   }
//   input communityInput{
//       communityName :String,
//       communityDisplayName :String,
//       communityDefId:String,
//       communityDefCode:String,
//       communityDefName:String,
//       link : String,
//       showOnMap : Boolean,
//       communityDescription : String,
//       isActive : Boolean,
//   }
//   input communityDefInput
//   {
//       name :String,
//       displayName :String,
//       communityImageLink: String,
//       code: String,
//       aboutCommunity : String,
//       clusters: [clusters],
//       chapters: [chapters],
//       showOnMap : Boolean,
//       isActive : Boolean,
//     }
//
//     type Mutation {
//          updateCommunityDef(_id:String, communityDef:communityDefInput): String
//     }
//      type Query{
//         fetchCommunityDef(_id:String): CommunityDef
//         fetchCommunityDefs: CommunityDefOutput
//     }
// `
//
// MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], CommunitySchema]);

let communitySchema = `

    type CommunityAccessObject{
        _id:String,
        platformId:String,
        clusterId:String,
        chapterId:String,
        subChapterId:String,
        communityId:String,
        communityDefId:String,
        communityDefCode:String,
        communityDefName:String,
        showOnMap:Boolean,
        isRoot:Boolean,
        isLeaf:Boolean,
        isActive:Boolean,
        isAvailableByParent:Boolean,
        hierarchyLevel:Int,
        hierarchyCode:String
    }
    
    type communityObject{
        communityName:String,
        communityDisplayName:String,
        communityDescription:String,
        communityDefId:String,
        communityDefId:String,
        communityDefCode:String,
        communityDefName:String,
        clusterId:String,
        clusterName:String,
        chapterId:String,
        chapterName:String,
        subChapterId:String,
        subChapterName:String,
        communityCode:String,
        showOnMap:Boolean,
        isActive:Boolean
    }
    
    type Community{
        _id:String,
        name:String,
        displayName:String,
        code:String,
        communityImageLink:String,
        showOnMap:String,
        aboutCommunity:String,
        isActive:Boolean
    }
    
    input communityAccessObject{
        _id:String,
        platformId:String,
        clusterId:String,
        chapterId:String,
        subChapterId:String,
        communityId:String,
        communityDefId:String,
        communityDefCode:String,
        communityDefName:String,
        showOnMap:Boolean,
        isRoot:Boolean,
        isLeaf:Boolean,
        isActive:Boolean,
        isAvailableByParent:Boolean,
        hierarchyLevel:Int,
        hierarchyCode:String
    }
    
    input communityObject{
        communityName:String,
        communityDisplayName:String,
        communityDescription:String,
        communityDefId:String,
        communityDefId:String,
        communityDefCode:String,
        communityDefName:String,
        clusterId:String,
        clusterName:String,
        chapterId:String,
        chapterName:String,
        subChapterId:String,
        subChapterName:String,
        communityCode:String,
        showOnMap:Boolean,
        isActive:Boolean
    }
    
    input communityDefObject{
        _id:String,
        name:String,
        displayName:String,
        code:String,
        communityImageLink:String,
        showOnMap:String,
        aboutCommunity:String,
        isActive:Boolean
    }
    
    type MapData {
       key:String,
       count:Int
    }

    type Mutation{
        updateCommunityDef(community:communityDefObject): String
        updateCommunityAccess(community:communityAccessObject): String
        createCommunityAccess(clusterId:String, chapterId:String, subChapterId:String): String
        createCommunity(community:communityObject): String
    }
    
    type Query{
        FetchMapData(moduleName:String,id:String):[MapData]
        fetchCommunitiesDef:SearchResp
        fecthCommunitiesAccess:[CommunityAccessObject]
        fecthCommunityDef:Community
        fecthCommunityAccess:CommunityAccessObject
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], communitySchema]);
