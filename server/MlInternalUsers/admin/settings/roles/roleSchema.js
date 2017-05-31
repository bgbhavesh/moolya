import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
import MlResolver from '../../../../commons/mlResolverDef'

let Role = `

  type AssignRoles{
      cluster:String,
      chapter:String,
      subChapter:String,
      community :String,
      department:String, 
      subDepartment:String, 
      isActive:Boolean
  }
  
  type Modules{
      moduleId:String,
      moduleName:String,
      validFrom:Date,
      validTo:Date,
      isActive:Boolean,
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
        subChapter:String,
        userType:String,
        about:String,
        createdDateTime:Date,
        createdBy:String,
        departmentsList : [String],
        subdepartmentsList : [String],
        clustersList   : [String],
        chaptersList   : [String],
        subChapterList : [String],
        assignRoles:[AssignRoles],
        modules: [Modules],
        isActive:Boolean,
        isHierarchyAssigned:Boolean
  }
  
  scalar Date
  input assignroles{
      cluster:String,
      chapter:String,
      subChapter:String,
      community : String,
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
      actions : [actions],
      moduleName:String,
      validFrom:Date,
      validTo:Date,
      isActive:Boolean
  }
  
  input roleObject{
      id :String
      roleName: String, 
      displayName:String, 
      roleType:String,
      userType:String,
      subChapter:String,
      about:String, 
      assignRoles:[assignroles],
      modules:[modules], 
      isActive:Boolean,
      isHierarchyAssigned:Boolean
  }
  
  
  type Query {
      fetchRole(roleName: String, roleValue: String, name: String): String
      fetchRolesByDepSubDep(departmentId:String, clusterId:String, chapterId:String, subChapterId:String, communityId:String): [Roles]
      findRole(id:String):Roles
      fetchActiveRoles: [Roles]
      fetchAllAssignedRoles(roleIds:[String]):[String]
      fetchRolesForRegistration(cluster:String,chapter:String,subChapter:String,department:String,subDepartment:String):[Roles]
  }
  
  type Mutation {
     createRole(role:roleObject, moduleName:String, actionName:String):response
     updateRole(roleId:String, role:roleObject, moduleName:String, actionName:String):response
  }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Role]);
let supportedApi = [
    {api:'fetchRole', actionName:'READ', moduleName:"ROLES"},
    {api:'fetchRolesByDepSubDep', actionName:'READ', moduleName:"ROLES"},
    {api:'findRole', actionName:'READ', moduleName:"ROLES"},
    {api:'fetchActiveRoles', actionName:'READ', moduleName:"ROLES"},
    {api:'fetchAllAssignedRoles', actionName:'READ', moduleName:"ROLES"},
    {api:'fetchRolesForRegistration', actionName:'READ', moduleName:"ROLES"},
    {api:'createRole', actionName:'CREATE', moduleName:"ROLES"},
    {api:'updateRole', actionName:'UPDATE', moduleName:"ROLES"}
]

MlResolver.MlModuleResolver.push(supportedApi)
