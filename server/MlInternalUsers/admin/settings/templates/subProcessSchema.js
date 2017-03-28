import {mergeStrings} from 'gql-merge';
import MlSchemaDef from '../../mlAdminSchemaDef'
let Template = `        
    type SubProcess{
            _id             : String
            processName     : String
            subProcessName  : String
            createdBy       : String      
            createdDate     : String
            steps           : [step]      
    }
    type step{
            stepId   : String
            stepCode : String
            stepName : String
            isActive : String    
    }
    type template{
            stepCode    : String
            stepName    : String
            templateCode: String
            templateName: String
            isActive          : Boolean
            createdDate       : String
            userType:String
    }
    type templateAssignment{
            process           : String
            subProcess        : String
            assignedTemplates : [template]            
    }
    type Query{
            findTemplateSteps(id: String):SubProcess
            findStepAssignedTemplates(id: String):templateAssignment
            fetchAssignedTemplate(process:String,subProcess:String,stepCode:String,recordId:String):template
    }
`

MlSchemaDef['schema'] = mergeStrings([MlSchemaDef['schema'],Template]);
