import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../../../commons/mlSchemaDef'
let Template = `        
    type TemplateDetails{
            _id                         : String,
            procesId                    : String,
            subProcessId                : String,
            processName                 : String,
            subProcessName              : String,
            templates                   : [template],
            createdBy                   : String,
            createdDate                 : String,
            isActive                    : Boolean  
    }
    type template{
            stepCode                    : String
            stepName                    : String
            templateCode                : String
            templateName                : String
            isActive                    : Boolean
            createdDate                 : String
            templateDescription         : String
            templateImage               : String
    }    
    type Query{
            findStepAssignedTemplates(id: String,stepCode:String):TemplateDetails
            findTemplates(id:String,stepCode:String):TemplateDetails
            findTemplatesSelect(id:String,stepName:String):[template]
    }
     type Mutation{
            updateStepAssignedTemplate(id: String,templateCode:String,isActive:Boolean):response
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Template]);
