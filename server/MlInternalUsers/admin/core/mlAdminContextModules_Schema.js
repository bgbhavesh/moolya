import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../commons/mlSchemaDef'


let contextSpecificSearch = `
union ContextSpecSearchResult = GenericType| Cluster | Chapter | SubChapter  | Community | MasterSettings | AuditLogs | RegistrationInfo | Portfoliodetails | TransactionsLog


type ContextSpecSearchResp {
  totalRecords:Int,
  data:[ContextSpecSearchResult]
}

input ContextParams{
   clusterId:String,
   chapterId:String,
   subChapterId:String,
   communityId:String,
   settingsType:String,
   moduleName: String
}

input SearchSpec{
    filter:String,
    sort  :String
}

type Query {
  ContextSpecSearch(module: String!,context:ContextParams,offset:Int,limit:Int,searchSpec:SearchSpec,fieldsData:[GenericFilter],sortData:[SortFilter]): ContextSpecSearchResp!
}`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],contextSpecificSearch]);
