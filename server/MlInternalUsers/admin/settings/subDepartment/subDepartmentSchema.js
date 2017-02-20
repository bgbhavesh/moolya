import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let subDepartmentSchema = `
        
    input SubDepatmentAvailable
    {
        cluster     : String,
        chapter     : String,
        subChapter  : String,
        email       : String,
        notify      : Boolean,
        isActive    : Boolean
    }
    
    type subDepatmentAvailable{ 
        cluster     : String,
        chapter     : String,
        subChapter  : String,
        email       : String,
        notify      : Boolean,
        isActive    : Boolean
    }
    
    type SubDepartment{
        _id:String,
        subDepartmentName :String,
        displayName :String,
        aboutSubDepartment: String,
        departmentId: String,
        isActive:Boolean,
        selectCluster:String,
        email:String,
        isMoolya : Boolean,
        SubDepatmentAvailable: [subDepatmentAvailable]
    }
    
    input subDepartmentObject{
        subDepartmentName:String,
        displayName:String,
        aboutSubDepartment:String,
        selectCluster:String,
        isActive:Boolean,
        departmentId:String,
        email:String,
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
