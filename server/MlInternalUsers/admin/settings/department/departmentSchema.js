import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let departmentSchema = `        
    
    type DepatmentAvailableSchema{
        cluster     : [String]
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
         isSystemDefined : Boolean
         clustersList   : [String]
         chaptersList   : [String]
         subChapterList : [String]
         isMoolya       : Boolean
         depatmentAvailable:[DepatmentAvailableSchema]
    }
   
    input DepatmentAvailable{
        cluster     : [String]
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
          isSystemDefined : Boolean
          depatmentAvailable:[DepatmentAvailable]
    }
    
    type Mutation{
         createDepartment(department: departmentObject!, moduleName:String!, actionName:String!):response
         updateDepartment(departmentId:String, department: departmentObject, moduleName:String, actionName:String):response
    }
    type Query{
        findDepartment(departmentId:String):Department
        fetchDepartments:[Department]
        fetchActiveDepartment:[Department]
        fetchMoolyaBasedDepartment(isMoolya:Boolean):[Department]
        fetchNonMoolyaBasedDepartment(isMoolya:Boolean,subChapter:String):[Department]
        fetchDepartmentsForRegistration(cluster:String,chapter:String,subChapter:String):[Department]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'], departmentSchema]);
// findDepartments:String
