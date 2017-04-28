import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let KycCategoriesSchema = `
    type KycCategories
    {
      docCategoryName :String
      docCategoryDisplayName :String
      about :String
      _id :String
      isActive :Boolean
    }
    input kycCategoryObject{
        docCategoryName :String,
        docCategoryDisplayName :String,
        about :String,
        _id :String,
        isActive :Boolean
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
