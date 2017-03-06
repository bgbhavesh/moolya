/**
 * Created by mohammed.mohasin on 05/03/17.
 */
import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let MasterSettingsSchema = `
   enum MASTER_SETTINGS_TYPE {
            LANGUAGE,TITLE,ADDRESSTYPE,EMAILTYPE,CONTACTTYPE,SOCIALLINKS,GENDER,
            EMPLOYMENTTYPE,COMPANYTYPE,TAXTYPE,TAXATION
}
      type LanguageInfo{
          languageName:String
          aboutLanguage:String
          languageDisplayName:String
      }
      
      input LanguageInfoRequest{
          languageName:String
          aboutLanguage:String
          languageDisplayName:String
      }
      
      type AddressTypeInfo{
          addressName:String
          aboutAddress:String
          addressDisplayName:String
          addressUploadIcon:String
      }
      
      input AddressTypeInfoRequest{
          addressName:String
          aboutAddress:String
          addressDisplayName:String
          addressUploadIcon:String
      }
     
     type TitleInfo{
          titleName:String
          aboutTitle:String
          titleDisplayName:String
      }
      
      input TitleInfoRequest{
          titleName:String
          aboutTitle:String
          titleDisplayName:String
      }
      
      
      type MasterSettings{
         _id:String,
         isActive:Boolean
         languageInfo:LanguageInfo
         addressTypeInfo:AddressTypeInfo
         titleInfo:TitleInfo
      }
      
      input MasterSettingsRequest{
         _id:String
         isActive:Boolean
         languageInfo:LanguageInfoRequest
         addressTypeInfo:AddressTypeInfoRequest
         titleInfo:TitleInfoRequest
      }

      type Query{
        fetchMasterSettings(type:MASTER_SETTINGS_TYPE!):[MasterSettings]
        findMasterSetting(_id:String):MasterSettings
    }
    
    type Mutation{
      createMasterSetting(moduleName:String,actionName:String,type:MASTER_SETTINGS_TYPE!,masterData:MasterSettingsRequest):String
      updateMasterSetting(moduleName:String,actionName:String,type:MASTER_SETTINGS_TYPE!,masterData:MasterSettingsRequest):String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],MasterSettingsSchema]);
