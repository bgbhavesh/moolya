import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let ChapterSchema = `
    type Chapter{
      clusterId:String
      chapterName: String
      diplayName: String
      about:String
      link:String
      id:String
      state:String
      email:String
      isActive:Boolean
      showOnMap:Boolean
    }
    
    
     type Mutation {
      createChapter (
        clusterId:String
        chapterName: String
        diplayName: String
        about:String
        link:String
        id:String
        state:String
        email:String
        showOnMap:Boolean
        isActive:Boolean
    ):String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],ChapterSchema]);
