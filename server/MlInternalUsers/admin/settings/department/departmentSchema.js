import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let CreateDepartment = `        
    
    type Department{
      departmentName :String
      displayName :String
      departmentDesc: String
      _id:String
      isActive:Boolean
      isMoolya : Boolean
      countryFlag:String
    }
    
    input DepatmentAvailable{
    cluster : String
    chapter : String
    subChapter : String
    email : String
    notify : Boolean
    isActive : Boolean
    }
    
    type Mutation{
        CreateDepartment(departmentName:String,displayName:String,departmentDesc:String,isActive:Boolean,isMoolya:Boolean,depatmentAvailable:[DepatmentAvailable]):String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],CreateDepartment]);
console.log(MlSchemaDef);
