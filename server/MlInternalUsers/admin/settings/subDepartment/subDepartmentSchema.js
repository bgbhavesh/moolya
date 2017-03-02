import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let subDepartmentSchema = `
  
   
    type SubDepartment{
        _id:String,
        subDepartmentName:String,
        displayName:String,
          aboutSubDepartment:String,
        isActive:Boolean,
        departmentId:String,
        isMoolya:Boolean,
        subDepatmentAvailable: [subDepatmentAvailable]
    }
    
    type subDepatmentAvailable{ 
        cluster     : [String],
        chapter     : String,
        subChapter  : String,
        email       : String,
        isActive    : Boolean
    }
    
    
    input SubDepatmentAvailable
    {
        cluster     : [String],
        chapter     : String,
        subChapter  : String,
        email       : String,
        isActive    : Boolean
    }
    
    input subDepartmentObject{
        subDepartmentName:String,
        displayName:String,
        aboutSubDepartment:String,
        isActive:Boolean,
        departmentId:String,
        isMoolya:Boolean,
        subDepatmentAvailable:[SubDepatmentAvailable]
    }
    
    type Mutation{
        createSubDepartment(subDepartment:subDepartmentObject):String
        updateSubDepartment(subDepartmentId:String, subDepartment:subDepartmentObject):String
    }
    type Query{
        findSubDepartment(_id: String): SubDepartment
        findSubDepartments: [SubDepartment]
        fetchSubDepartments(id: String):[SubDepartment]
        fetchActiveSubDepartments(departmentId: String):[SubDepartment]
    }
`
MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],subDepartmentSchema]);
