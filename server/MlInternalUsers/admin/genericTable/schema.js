


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
union SearchResult = Cluster | Chapter

type SearchResp {
  totalRecords:Int,
  data:[SearchResult]
}
type Query {
  SearchQuery(text: String!): SearchResp!
}`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],search]);
