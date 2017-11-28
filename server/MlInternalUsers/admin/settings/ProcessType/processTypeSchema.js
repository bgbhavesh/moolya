import { mergeStrings } from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
import MlResolver from '../../../../commons/mlResolverDef'

const ProcessTypesSchema = `
    type ProcessTypes
    {
      processName :String
      displayName :String
      processDesc :String
      _id :String
      isActive :Boolean
    }
    type Query{
        FetchProcessType:[ProcessTypes]
    }
`

MlSchemaDef.schema = mergeStrings([MlSchemaDef.schema, ProcessTypesSchema]);
const supportedApi = [
  {
    api: 'FetchProcessType', actionName: 'READ', moduleName: 'PROCESSTYPES', isWhiteList: true
  }
]
MlResolver.MlModuleResolver.push(supportedApi)
