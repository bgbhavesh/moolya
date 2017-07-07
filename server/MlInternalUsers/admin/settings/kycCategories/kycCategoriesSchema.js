import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
import MlResolver from '../../../../commons/mlResolverDef'

let KycCategoriesSchema = `
    type KycCategories
    {
      docCategoryName :String
      docCategoryDisplayName :String
      about :String
      _id :String
      createdBy     :  String
      createdDate   :  Date
      updatedBy     :  String
      updatedDate   :  Date
      isActive :Boolean
    }
    input kycCategoryObject{
        docCategoryName :String,
        docCategoryDisplayName :String,
        about :String,
        _id :String,
        createdBy     : String
        createdDate   : Date
        updatedBy     : String
        updatedDate   : Date
        isActive      : Boolean
    }
    
   type Mutation 
    {
        updateKycCategory(_id:String, docCategoryName:String, docCategoryDisplayName:String, about:String, isActive:Boolean , moduleName:String, actionName:String):response
        createKycCategory(kycCategory:kycCategoryObject, moduleName:String, actionName:String):response
    }
    type Query{
        findKycCategory(_id:String): KycCategories
        fetchKYCCategories:[KycCategories]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],KycCategoriesSchema]);
let supportedApi = [
  {api:'findKycCategory', actionName:'READ', moduleName:"DOCUMENTS"},
  {api:'fetchKYCCategories', actionName:'READ', moduleName:"DOCUMENTS"},
  {api:'createKycCategory', actionName:'CREATE', moduleName:"DOCUMENTS"},
  {api:'updateKycCategory', actionName:'UPDATE', moduleName:"DOCUMENTS"}
]
MlResolver.MlModuleResolver.push(supportedApi)

