import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Role = `

  type AssignRoles{
      cluster:String,
      chapter:String,
      subChapter:String,
      department:String, 
      subDepartment:String, 
      isActive:Boolean
  }
  
  type Modules{
      moduleId:String,
      actions : [Actions]
  }
  
  type Actions{
      actionId : String
  }

  type Roles{
        _id:String,
        roleName: String, 
        displayName:String, 
        roleType:String,
        userType:String,
        about:String,
        assignRoles:[AssignRoles],
        modules: [Modules]
  }
  
  scalar Date
  input assignroles{
      cluster:String,
      chapter:String,
      subChapter:String,
      department:String, 
      subDepartment:String, 
      isActive:Boolean
  }
  
  input permissions{
      actionId:String,
      validFrom:Date,
      validTo:Date,
      isActive:Boolean
  }
  
  input fieldRestrictions{
      fieldName:String,
      actionId:String
  }
  
  input actions{
      actionId : String
  }
  
  input modules{
      moduleId:String,
      actions : [actions]
      fieldRestrictions: [fieldRestrictions],
      permissions:[permissions]
  }
  
  input roleObject{
      roleName: String, 
      displayName:String, 
      roleType:String,
      userType:String,
      about:String, 
      assignRoles:[assignroles],
      modules:[modules], 
      isActive:Boolean
  }
  
  type Query {
      fetchRole(roleName: String, roleValue: String, name: String): String
      fetchRolesByDepSubDep(departmentId:String, subDepartmentId:String): [Roles]
      findRole(id:String):Roles
  }
  
  type Mutation {
     createRole(role:roleObject): String
     updateRole(id:String,role:roleObject):String
  }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Role]);

