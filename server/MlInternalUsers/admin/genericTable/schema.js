


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
union SearchResult = Cluster | Chapter | SubChapter | Community | Department | SubDepartment | Requests | Countries | States | Cities | UserTypes | Transaction | RoleTypes | DocumentTypes | DocumentFormats | KycCategories | DocumentMapping | Template | BackendUsers | Industry | Specification | Profession | Entity | StageOfCompany | BusinessType | Citizenship | LookingFor | Assets | Roles | ProcessType | Tax | taxation | Title | Regional | Language | DateAndTime | NumericalFormat | AddressType | CompanyType | Gender | SocialLinks | EmployeeType | EmailType | ContactType | RegistrationInfo | TemplateDetails | TemplateAssignment | Hierarchy | Portfoliodetails

input SearchGenericSpec{
  filter:[GenericFilter],
    sort  :String
}

input GenericFilter {
   fieldName: String,
   value: String
}

input SortFilter {
  fieldName : String,
  sort : String
}
type SearchResp {
  totalRecords:Int,
  data:[SearchResult]
}
type Query {
  SearchQuery(module: String!,offset: Int,limit:Int,fieldsData:[GenericFilter],sortData:[SortFilter]): SearchResp!
}`

MlSchemaDef['schema']=mergeStrings([MlSchemaDef['schema'],search]);

//have to integrate to search
// valueType: String || Boolean || Date,
// operator: String!,
// valueType: String

// SearchQuery(module: String!,offset: Int,limit:Int,fieldsData:[GenericFilter]): SearchResp!
