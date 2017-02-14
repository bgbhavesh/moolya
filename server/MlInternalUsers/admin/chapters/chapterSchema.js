import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let chapterSchema = `
    type Chapter{
        clusterId:String,
        chapterName: String,
        diplayName: String,
        about:String,
        link:String,
        id:String,
        state:String,
        email:String,
        isActive:Boolean,
        showOnMap:Boolean
    }
    
    input chapterObject{
        clusterId:String,
        chapterName: String,
        diplayName: String,
        about:String,
        link:String,
        id:String,
        state:String,
        email:String,
        showOnMap:Boolean,
        isActive:Boolean
    }
    
     type Mutation {
        createChapter(chapter:chapterObject):String
     }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], chapterSchema]);
