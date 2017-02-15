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
    
    type Query{ 
        fetchChapter:String
        fetchChapters:String
    }
    
     type Mutation {
        createChapter(chapter:chapterObject):String
        updateChapter(chapterId:String, chapter:chapterObject):String
     }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], chapterSchema]);
