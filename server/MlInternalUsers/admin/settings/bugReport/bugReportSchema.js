import { mergeStrings } from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
import MlResolver from '../../../../commons/mlResolverDef'

const BugReportSchema = `
   input bugDetails{
        details  :String,
        reportedUrl   :String
    }
    
   type Mutation 
    {
        createBugReport(details:bugDetails):response
    }
`

MlSchemaDef.schema = mergeStrings([MlSchemaDef.schema, BugReportSchema]);
const supportedApi = [
  {
    api: 'createBugReport', actionName: 'CREATE', moduleName: 'BUG_REPORT', isWhiteList: true
  }
];
MlResolver.MlModuleResolver.push(supportedApi)
