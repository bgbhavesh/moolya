import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
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
        updateKycCategory(_id:String, docCategoryName:String, docCategoryDisplayName:String, about:String, isActive:Boolean):String
        createKycCategory(kycCategory:kycCategoryObject):String
    }
    type Query{
        findKycCategory(_id:String): KycCategories
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],KycCategoriesSchema]);
