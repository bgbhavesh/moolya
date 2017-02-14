import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let departmentSchema = `        
    
    type Department{
        _id:String
        departmentName :String
        displayName :String
        departmentDesc: String        
        isActive:Boolean
        isMoolya : Boolean
        countryFlag:String
    }
    
    input DepatmentAvailable{
        cluster     : String
        chapter     : String
        subChapter  : String
        email       : String
        notify      : Boolean
        isActive    : Boolean
    }
    
    input departmentObject{
          departmentName:String,
          displayName:String,
          departmentDesc:String,
          isActive:Boolean,
          isMoolya:Boolean,
          depatmentAvailable:[DepatmentAvailable]
    }
    
    type Mutation{
         createDepartment(department: departmentObject):String
         updateDepartment(departmentId:String, department: departmentObject):String
    }
    type Query{
        findDepartment(departmentId:String):String
        findDepartments:String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], departmentSchema]);
console.log(MlSchemaDef);
