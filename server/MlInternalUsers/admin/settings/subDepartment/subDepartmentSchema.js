import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let SubDepartment = `        
    
    type SubDepartment{
      subDepartmentName :String
      displayName :String
      aboutSubDepartment: String
      _id:String
      isActive:Boolean
      isMoolya : Boolean
      countryFlag:String
    }
    
    input SubDepatmentAvailable{
    cluster : String
    chapter : String
    subChapter : String
    email : String
    notify : Boolean
    isActive : Boolean
    }
    
    type Mutation{
        CreateSubDepartment(_id:String,subDepartmentName:String,displayName:String,aboutSubDepartment:String,isActive:Boolean,departmentId:String,isMoolya:Boolean,subDepatmentAvailable:[SubDepatmentAvailable]):String
        UpdateSubDepartment(_id:String,subDepartmentName:String,displayName:String,aboutSubDepartment:String,isActive:Boolean,departmentId:String,isMoolya:Boolean,subDepatmentAvailable:[SubDepatmentAvailable]):String
    }
    type Query{
      FindSubDepartment(_id: String):SubDepartment
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],SubDepartment]);
console.log(MlSchemaDef);
