


import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'
let moolya = `
    interface moolya {
     id : String
     }

    type Cluster implements moolya {
      id : String
      countryId: String
      displayName: String
    }    
    type Chapter implements moolya {
      id : String
      clusterId: String
      chapterName: String
    }
    
`

//MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],moolya]);

let search = `
union SearchResult = Cluster | Chapter | SubChapter | Department | SubDepartment | Permissions | Requests | Countries | States | Cities | UserTypes | Transaction | RoleTypes | DocumentTypes | DocumentFormats | KycCategories | DocumentMapping | Template | BackendUsers

type SearchResp {
  totalRecords:Int,
  data:[SearchResult]
}
type Query {
  SearchQuery(module: String!,offset: Int,limit:Int): SearchResp!
}`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],search]);
