import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let Chapter = `
    type Chapter{
      clusterId:String
      chapterName: String
      diplayName: String
      about:String
      link:String
      id:String
      state:String
      email:String
      status:Boolean
      showOnMap:Boolean
    }
`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],Chapter]);
