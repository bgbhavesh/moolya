import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let ProfessionSchema = `
    type Profession
    {
      professionName :String
      professionDisplayName :String
      industryId: String
      industryName: String
      about: String
      _id:String
      isActive:Boolean
    }
   type Mutation 
    {
        CreateProfession(_id:String,professionName:String, professionDisplayName:String, industryId:String,industryName:String,about:String, isActive:Boolean, moduleName:String, actionName:String):response
        UpdateProfession(_id:String,professionName:String, professionDisplayName:String, industryId:String,industryName:String,about:String, isActive:Boolean, moduleName:String, actionName:String):response
    }
    type Query{
        FindProfession(_id:String): Profession
        fetchProfessions:[Profession]
        FetchProfessionIndustry(industry:[String]):[Profession]
        fetchIndustryBasedProfession(industryId:String):[Profession]
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],ProfessionSchema]);
