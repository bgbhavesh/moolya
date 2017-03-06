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
      type TaxTypeInfo{
          taxName:String
          aboutTax:String
          taxDisplayName:String
      }
      input TaxTypeInfoRequest{
          taxName:String
          aboutTax:String
          taxDisplayName:String
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
      
      type EmploymentTypeInfo{
          employmentName:String
          employmentDisplayName:String
          aboutEmployment:String
      }
      
      input EmploymentTypeInfoRequest{
          employmentName:String
          employmentDisplayName:String
          aboutEmployment:String
      }
      
      
      type CompanyTypeInfo{
          companyName:String
          companyDisplayName:String
          aboutCompany:String
      }
      
      input CompanyTypeInfoRequest{
          companyName:String
          companyDisplayName:String
          aboutCompany:String
      }
      
      
      type MasterSettings{
         _id:String,
         isActive:Boolean
         taxTypeInfo:TaxTypeInfo
         languageInfo:LanguageInfo
         addressTypeInfo:AddressTypeInfo
         titleInfo:TitleInfo
         employmentTypeInfo:EmploymentTypeInfo
         companyTypeInfo:CompanyTypeInfo
      }
      
      input MasterSettingsRequest{
         _id:String
         isActive:Boolean
         taxTypeInfo:TaxTypeInfoRequest
         languageInfo:LanguageInfoRequest
         addressTypeInfo:AddressTypeInfoRequest
         titleInfo:TitleInfoRequest
         employmentTypeInfo:EmploymentTypeInfoRequest
         companyTypeInfo:CompanyTypeInfoRequest
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
