import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let departmentSchema = `        
    
    type ClusterListSchema{
        clusterId   : String
    }
    
    type DepatmentAvailableSchema{
        cluster     : [ClusterListSchema]
        chapter     : String
        subChapter  : String
        email       : String
        isActive    : Boolean
    }
    
    type Department{
         _id            : String
         departmentName : String
         displayName    : String
         departmentDesc : String
         isActive       : Boolean
         clustersList   : [String]
         chaptersList   : [String]
         subChapterList : [String]
         isMoolya       : Boolean
         depatmentAvailable:[DepatmentAvailableSchema]
    }
    
    input ClusterList{
        clusterId     : String
    }
    
    input DepatmentAvailable{
        cluster     : [ClusterList]
        chapter     : String
        subChapter  : String
        email       : String
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
         createDepartment(department: departmentObject!, moduleName:String!, actionName:String!):String
         updateDepartment(departmentId:String, department: departmentObject):String
    }
    type Query{
        findDepartment(departmentId:String):Department
        findDepartments:String
        fetchDepartments:[Department]
        fetchActiveDepartment:[Department]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], departmentSchema]);
