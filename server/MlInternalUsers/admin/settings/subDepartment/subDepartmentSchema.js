import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let SubDepartment = `        
    
    
    input SubDepatmentAvailable{
    cluster : String
    chapter : String
    subChapter : String
    email : String
    notify : Boolean
    isActive : Boolean
    }
    
    type Mutation{
        CreateSubDepartment(subDepartmentName:String,displayName:String,aboutSubDepartment:String,isActive:Boolean,departmentId:String,isMoolya:Boolean,subDepatmentAvailable:[SubDepatmentAvailable]):String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],SubDepartment]);
console.log(MlSchemaDef);
