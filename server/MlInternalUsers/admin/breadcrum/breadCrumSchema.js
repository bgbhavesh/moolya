import { mergeStrings } from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'
import MlResolver from '../../../commons/mlResolverDef'

const breadCrumHierarchyDetails = `
    type BreadCrumHierarchyDetails{
      hierarchyLevel:Int
      hierarchyRefId:String
      hierarchyRefName:String
      moduleFieldRef:String
    }
    input BreadCrumHierarchy 
    {
      clusterId:String,
      chapterId:String,
      subChapterId:String,
      communityId:String
    }
    type Query {
        FetchBreadCrumHierarchyDetails(hierarchyContext:BreadCrumHierarchy): [BreadCrumHierarchyDetails]
    }
`

MlSchemaDef.schema = mergeStrings([MlSchemaDef.schema, breadCrumHierarchyDetails]);
const supportedApi = [
  {
    api: 'FetchBreadCrumHierarchyDetails', actionName: 'READ', moduleName: 'GENERIC', isWhiteList: true
  }
]
MlResolver.MlModuleResolver.push(supportedApi)
