import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let MasterSettingsSchema = `
   enum MASTER_SETTINGS_TYPE {
            LANGUAGE,TITLE,ADDRESSTYPE,EMAILTYPE,CONTACTTYPE,SOCIALLINKS,GENDER,
            EMPLOYMENTTYPE,COMPANYTYPE,TAXTYPE,TAXATION
}
      type LanguageInfo{
          languageName:String!
          aboutLanguage:String!
          languageDisplayName:String!
      }
      
      input LanguageInfoRequest{
          languageName:String
          aboutLanguage:String
          languageDisplayName:String
      }

      type MasterSettings{
         languageInfo:LanguageInfo
      }
      
      input MasterSettingsRequest{
         isActive:String
         languageInfo:LanguageInfoRequest
      }

      type Query{
        fetchMasterSettings(type:MASTER_SETTINGS_TYPE!):[MasterSettings]    
    }
    
    type Mutation{
      createMasterSetting(type:MASTER_SETTINGS_TYPE!,settingsData:MasterSettingsRequest):String
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],MasterSettingsSchema]);
