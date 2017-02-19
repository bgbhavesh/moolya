import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
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
        CreateProfession(_id:String,professionName:String, professionDisplayName:String, industryId:String,industryName:String,about:String, isActive:Boolean):String
        UpdateProfession(_id:String,professionName:String, professionDisplayName:String, industryId:String,industryName:String,about:String, isActive:Boolean):String
    }
    type Query{
        FindProfession(_id:String): Profession
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],ProfessionSchema]);
