import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../mlAdminSchemaDef'


let contextSpecificSearch = `
union ContextSpecSearchResult = Cluster | Chapter | SubChapter  | Community


type ContextSpecSearchResp {
  totalRecords:Int,
  data:[ContextSpecSearchResult]
}

input ContextParams{
   clusterId:String,
   chapterId:String,
   subChapterId:String,
   communityId:String
}

input SearchSpec{
    filter:String,
    sort  :String
}

type Query {
  ContextSpecSearch(module: String!,context:ContextParams,offset:Int,limit:Int,searchSpec:SearchSpec): ContextSpecSearchResp!
}`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],contextSpecificSearch]);
