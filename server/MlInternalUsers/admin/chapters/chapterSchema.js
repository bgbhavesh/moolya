import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let chapterSchema = `
    type Chapter{
        _id:String,
        chapterId:String,
        chapterName:String,
        displayName:String,
        about:String,
        chapterImage:String,
        stateName:String,
        stateId:String,
        cityId:String,
        cityName:String,
        latitude:String,
        longitude:String,
        email:String,
        showOnMap:Boolean,
        isActive:Boolean
        
    }
    
    input chapterObject{
        clusterId:String,
        clusterName:String,
        chapterId:String,
        chapterName:String,
        displayName:String,
        about:String,
        chapterImage:String,
        stateName:String,
        stateId:String,
        cityId:String,
        cityName:String,
        latitude:String,
        longitude:String,
        email:String,
        showOnMap:Boolean,
        isActive:Boolean
    }
    
    input associatedChapters{ 
        chapterId:String
    }
    
    type SubChapter{
        _id:String
        clusterId:String
        clusterName: String
        chapterId:String
        subChapterImageLink:String
        chapterName :String
        subChapterName :String
        subChapterDisplayName: String
        aboutSubChapter: String
        subChapterImageLink: String
        subChapterEmail: String
        isEmailNotified: String 
        showOnMap : Boolean
        isActive: Boolean
    }
    
    input subChapterDataAcessMatrix{
        roleType:String,
        acessType:String,
        canSearch:Boolean,
        canView:Boolean,
        canDiscover:Boolean
    }
    
    input subChapterObject{
        _id:String,
        clusterId:String, 
        clusterName:String,
        stateId:String,
        chapterId:String,
        chapterName:String,
        subChapterId:String,
        subChapterName:String,
        subChapterDisplayName:String,
        associatedChapters:[associatedChapters],
        subChapterUrl:String,
        isUrlNotified:Boolean,
        subChapterEmail:String,
        isEmailNotified:Boolean,
        aboutSubChapter:String,
        subChapterImageLink:String,
        showOnMap:Boolean,
        isActive:Boolean,
        isBespokeRegistration:Boolean,
        latitude:String,
        longitude:String,
        isBespokeWorkFlow:Boolean,
        subChapterDataAcessMatrix:[subChapterDataAcessMatrix]
    }
    
     type SubChapterResponse{
         data:[SubChapter]
    }
    
    type Query{ 
        fetchChapter:String
        fetchChapters(id:String):[Chapter]
        fetchSubChapter(_id: String):SubChapter
        fetchSubChapters(id: String):SubChapterResponse
        fetchChaptersForMap:[Chapter]
        fetchActiveSubChapters(chapterId:String):[SubChapter]
    }
    
     type Mutation {
        createChapter(chapter:chapterObject):String
        updateChapter(chapterId:String, chapter:chapterObject):String
        createSubChapter(subChapter:subChapterObject):String
        updateSubChapter(subChapterId:String, subChapterDetails:subChapterObject):String
     }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], chapterSchema]);
