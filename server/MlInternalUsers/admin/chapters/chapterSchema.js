import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let chapterSchema = `
    type Chapter{
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
    
    input subChapterDataAcessMatrix{
        roleType:String,
        acessType:String,
        canSearch:Boolean,
        canView:Boolean,
        canDiscover:Boolean
    }
    
    input subChapterObject{
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
        isBespokeWorkFlow:Boolean,
        subChapterDataAcessMatrix:[subChapterDataAcessMatrix]
    }
    
    type Query{ 
        fetchChapter:String
        fetchChapters:String
        fetchSubChapter:String
        fetchSubChapters:String
    }
    
     type Mutation {
        createChapter(chapter:chapterObject):String
        updateChapter(chapterId:String, chapter:chapterObject):String
        createSubChapter(subChapter:subChapterObject):String
     }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], chapterSchema]);
