import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'

// let communitySchema = `
//
//     type CommunityAccessObject{
//         _id:String,
//         platformId:String,
//         clusterId:String,
//         chapterId:String,
//         subChapterId:String,
//         communityId:String,
//         communityDefId:String,
//         communityDefCode:String,
//         communityDefName:String,
//         showOnMap:Boolean,
//         isRoot:Boolean,
//         isLeaf:Boolean,
//         isActive:Boolean,
//         isAvailableByParent:Boolean,
//         hierarchyLevel:Int,
//         hierarchyCode:String
//     }
//
//     type communityObject{
//         communityName:String,
//         communityDisplayName:String,
//         communityDescription:String,
//         communityDefId:String,
//         communityDefId:String,
//         communityDefCode:String,
//         communityDefName:String,
//         clusterId:String,
//         clusterName:String,
//         chapterId:String,
//         chapterName:String,
//         subChapterId:String,
//         subChapterName:String,
//         communityCode:String,
//         showOnMap:Boolean,
//         isActive:Boolean
//     }
//
//     type Community{
//         _id:String,
//         name:String,
//         displayName:String,
//         code:String,
//         communityImageLink:String,
//         showOnMap:String,
//         aboutCommunity:String,
//         isActive:Boolean
//     }
//
//     input communityAccessObject{
//         _id:String,
//         platformId:String,
//         clusterId:String,
//         chapterId:String,
//         subChapterId:String,
//         communityId:String,
//         communityDefId:String,
//         communityDefCode:String,
//         communityDefName:String,
//         showOnMap:Boolean,
//         isRoot:Boolean,
//         isLeaf:Boolean,
//         isActive:Boolean,
//         isAvailableByParent:Boolean,
//         hierarchyLevel:Int,
//         hierarchyCode:String
//     }
//
//     input communityObject{
//         communityName:String,
//         communityDisplayName:String,
//         communityDescription:String,
//         communityDefId:String,
//         communityDefId:String,
//         communityDefCode:String,
//         communityDefName:String,
//         clusterId:String,
//         clusterName:String,
//         chapterId:String,
//         chapterName:String,
//         subChapterId:String,
//         subChapterName:String,
//         communityCode:String,
//         showOnMap:Boolean,
//         isActive:Boolean
//     }
//
//     input communityDefObject{
//         _id:String,
//         name:String,
//         displayName:String,
//         code:String,
//         communityImageLink:String,
//         showOnMap:String,
//         aboutCommunity:String,
//         isActive:Boolean
//     }
//
//     type communityDefAccess{
//         name:String,
//         displayName:String,
//         code:String,
//         communityImageLink:String,
//         showOnMap:String,
//         aboutCommunity:String,
//         isActive:Boolean,
//         clusters:[String],
//         chapters:[String],
//         subchapters:[String],
//
//     }
//
//     type MapData {
//        key:String,
//        count:Int
//     }
//
//     type Mutation{
//         updateCommunityDef(communityId: String!, community:communityDefObject, clusters:[String], chapters:[String], subChapters:[String]): response,
//         updateCommunityAccess(community:communityAccessObject): String,
//         createCommunityAccess(clusterId:String, chapterId:String, subChapterId:String): String,
//         createCommunity(community:communityObject): String
//     }
//
//     type Query{
//         FetchMapData(moduleName:String,id:String):[MapData]
//         fetchCommunitiesDef:SearchResp
//         fecthCommunitiesAccess:[CommunityAccessObject]
//         fecthCommunityDef(communityId:String):Community
//         fecthCommunityAccess:CommunityAccessObject
//         fetchActiveCommunityAccess:[CommunityAccessObject]
//     }
// `

let communitySchema = `
    type Community{
        name:String,
        displayName:String,
        code:String,
        communityImageLink:String,
        showOnMap:String,
        aboutCommunity:String,
        isActive:Boolean,
        clusters:[String],
        chapters:[String],
        subchapters:[String]
    }
    
    input community{
        name:String,
        displayName:String,
        code:String,
        communityImageLink:String,
        showOnMap:String,
        aboutCommunity:String,
        isActive:Boolean,
        clusters:[String],
        chapters:[String],
        subchapters:[String]
    }
    
    type Query{
        fetchCommunities:SearchResp
        fetchCommunityDef(communityId:String):Community
    }
    
    type Mutation{
        createCommunityAccess(clusterId:String, chapterId:String, subChapterId:String): String
        updateCommunityDef(community:community): response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], communitySchema]);
